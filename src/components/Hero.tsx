import { Button } from "@/components/ui/button";
import { Mail, FileText } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useNavigate } from "react-router-dom";
import profilePhoto from "@/assets/profile-photo.jpg";

export const Hero = () => {
  const navigate = useNavigate();
  
  const { data: aboutMe } = useQuery({
    queryKey: ["about-me"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("about_me")
        .select("*")
        .maybeSingle();
      
      if (error) throw error;
      return data;
    },
  });

  return (
    <section className="min-h-screen flex items-center justify-center px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent pointer-events-none" />
      
      <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
        <div className="w-40 h-40 mx-auto mb-8 rounded-full overflow-hidden border-4 border-primary shadow-[0_0_40px_hsl(45_100%_51%/0.4)]">
          <img 
            src={aboutMe?.profile_image_url || profilePhoto} 
            alt={aboutMe?.name || "Gaurav Sabe"}
            className="w-full h-full object-cover"
          />
        </div>
        
        <h1 className="text-6xl md:text-8xl font-bold">
          <span className="text-gradient glow-effect">
            {aboutMe?.name || "GAURAV SABE"}
          </span>
        </h1>
        
        <p className="text-2xl md:text-3xl text-muted-foreground">
          {aboutMe?.title || "Full Stack Developer"}
        </p>
        
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {aboutMe?.summary || "Motivated Java Developer | Engineering Student"}
        </p>
        
        <div className="flex flex-wrap gap-4 justify-center pt-8">
          <Button 
            size="lg" 
            className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-8"
            onClick={() => navigate("/contact")}
          >
            <Mail className="mr-2 h-5 w-5" />
            Contact Me
          </Button>
          
          <Button 
            size="lg" 
            variant="outline"
            className="border-primary text-foreground hover:bg-primary/10 font-semibold px-8"
          >
            <FileText className="mr-2 h-5 w-5" />
            Download Resume
          </Button>
        </div>
      </div>
    </section>
  );
};
