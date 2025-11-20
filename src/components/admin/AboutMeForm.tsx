import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Upload, X } from "lucide-react";
import { useState } from "react";

const aboutMeSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  title: z.string().min(1, "Title is required").max(100),
  summary: z.string().min(1, "Summary is required").max(1000),
  email: z.string().email("Invalid email").max(255).optional().or(z.literal("")),
  phone: z.string().max(50).optional().or(z.literal("")),
  github_url: z.string().url("Invalid URL").max(255).optional().or(z.literal("")),
  linkedin_url: z.string().url("Invalid URL").max(255).optional().or(z.literal("")),
  profile_image_url: z.string().max(500).optional().or(z.literal("")),
});

type AboutMeFormData = z.infer<typeof aboutMeSchema>;

export const AboutMeForm = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);

  const { data: aboutMe, isLoading } = useQuery({
    queryKey: ["about-me"],
    queryFn: async () => {
      const { data, error } = await supabase.from("about_me").select("*").maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  const form = useForm<AboutMeFormData>({
    resolver: zodResolver(aboutMeSchema),
    values: aboutMe ? {
      name: aboutMe.name,
      title: aboutMe.title,
      summary: aboutMe.summary,
      email: aboutMe.email || "",
      phone: aboutMe.phone || "",
      github_url: aboutMe.github_url || "",
      linkedin_url: aboutMe.linkedin_url || "",
      profile_image_url: aboutMe.profile_image_url || "",
    } : undefined,
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!validTypes.includes(file.type)) {
      toast({ 
        title: "Invalid file type", 
        description: "Please upload a JPG, PNG, or WEBP image", 
        variant: "destructive" 
      });
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({ 
        title: "File too large", 
        description: "Please upload an image smaller than 5MB", 
        variant: "destructive" 
      });
      return;
    }

    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = async () => {
    if (aboutMe?.profile_image_url) {
      // Extract filename from URL and delete from storage
      const filename = aboutMe.profile_image_url.split("/").pop();
      if (filename) {
        await supabase.storage.from("project-images").remove([`profile/${filename}`]);
      }
    }
    setImageFile(null);
    setImagePreview("");
    form.setValue("profile_image_url", "");
  };

  const mutation = useMutation({
    mutationFn: async (data: AboutMeFormData) => {
      let imageUrl = data.profile_image_url;

      // Upload image if a new file is selected
      if (imageFile) {
        setIsUploading(true);
        const fileExt = imageFile.name.split(".").pop();
        const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
        const filePath = `profile/${fileName}`;

        // Delete old image if exists
        if (aboutMe?.profile_image_url) {
          const oldFilename = aboutMe.profile_image_url.split("/").pop();
          if (oldFilename) {
            await supabase.storage.from("project-images").remove([`profile/${oldFilename}`]);
          }
        }

        const { error: uploadError } = await supabase.storage
          .from("project-images")
          .upload(filePath, imageFile, { upsert: true });

        if (uploadError) {
          setIsUploading(false);
          throw uploadError;
        }

        const { data: urlData } = supabase.storage
          .from("project-images")
          .getPublicUrl(filePath);

        imageUrl = urlData.publicUrl;
        setIsUploading(false);
      }

      const payload = {
        name: data.name,
        title: data.title,
        summary: data.summary,
        email: data.email || null,
        phone: data.phone || null,
        github_url: data.github_url || null,
        linkedin_url: data.linkedin_url || null,
        profile_image_url: imageUrl || null,
      };

      if (aboutMe?.id) {
        const { error } = await supabase.from("about_me").update(payload).eq("id", aboutMe.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("about_me").insert([payload]);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["about-me"] });
      setImageFile(null);
      toast({ title: "Success", description: "About Me section updated successfully" });
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  if (isLoading) {
    return <div className="flex justify-center p-8"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((data) => mutation.mutate(data))} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="summary"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Summary</FormLabel>
              <FormControl>
                <Textarea {...field} rows={6} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email (Optional)</FormLabel>
                <FormControl>
                  <Input {...field} type="email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone (Optional)</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="github_url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>GitHub URL (Optional)</FormLabel>
                <FormControl>
                  <Input {...field} type="url" placeholder="https://github.com/username" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="linkedin_url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>LinkedIn URL (Optional)</FormLabel>
                <FormControl>
                  <Input {...field} type="url" placeholder="https://linkedin.com/in/username" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="md:col-span-2">
            <FormLabel>Profile Image (Optional)</FormLabel>
            <div className="mt-2 space-y-4">
              {(imagePreview || aboutMe?.profile_image_url) && (
                <div className="relative w-32 h-32 rounded-lg overflow-hidden border-2 border-border">
                  <img
                    src={imagePreview || aboutMe?.profile_image_url || ""}
                    alt="Profile preview"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute top-1 right-1 p-1 bg-destructive text-destructive-foreground rounded-full hover:bg-destructive/90 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}
              <div className="flex items-center gap-4">
                <Input
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                  onChange={handleImageChange}
                  className="max-w-md"
                />
                <Upload className="h-5 w-5 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground">
                Upload JPG, PNG, or WEBP (max 5MB)
              </p>
            </div>
          </div>
        </div>

        <Button type="submit" disabled={mutation.isPending || isUploading}>
          {(mutation.isPending || isUploading) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isUploading ? "Uploading..." : "Save Changes"}
        </Button>
      </form>
    </Form>
  );
};
