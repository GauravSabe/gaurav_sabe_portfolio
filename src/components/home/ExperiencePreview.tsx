import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, Calendar } from "lucide-react";
import { format } from "date-fns";

export const ExperiencePreview = () => {
  
  const { data: experiences } = useQuery({
    queryKey: ["experience-preview"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("experience")
        .select("*")
        .order("start_date", { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold">
            <span className="text-gradient">Experience</span>
          </h2>
        </div>

        <div className="space-y-6">
          {experiences?.map((exp) => (
            <Card key={exp.id} className="bg-card border-border card-hover">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <CardTitle className="flex items-center gap-2">
                      <Briefcase className="h-5 w-5 text-primary" />
                      {exp.role}
                    </CardTitle>
                    <CardDescription className="text-base">
                      {exp.company} {exp.location && `• ${exp.location}`}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground text-sm">
                    <Calendar className="h-4 w-4" />
                    {format(new Date(exp.start_date), "MMM yyyy")} - {exp.end_date ? format(new Date(exp.end_date), "MMM yyyy") : "Present"}
                  </div>
                </div>
              </CardHeader>
              {exp.description && (
                <CardContent>
                  <p className="text-foreground mb-4">{exp.description}</p>
                  {exp.highlights && exp.highlights.length > 0 && (
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                      {exp.highlights.map((highlight, index) => (
                        <li key={index}>{highlight}</li>
                      ))}
                    </ul>
                  )}
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
