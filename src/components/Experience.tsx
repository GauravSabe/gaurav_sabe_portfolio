import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Card } from "@/components/ui/card";
import { Briefcase, Calendar } from "lucide-react";
import { format } from "date-fns";

export const Experience = () => {
  const { data: experiences } = useQuery({
    queryKey: ["experience"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("experience")
        .select("*")
        .order("start_date", { ascending: false });
      
      if (error) throw error;
      return data || [];
    },
  });

  return (
    <section id="experience" className="py-20 px-4 bg-secondary/20">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
          <span className="text-gradient">Experience</span>
        </h2>
        
        <div className="space-y-6">
          {experiences?.map((exp) => (
            <Card key={exp.id} className="p-6 bg-card border-border card-hover">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>
                
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-foreground">{exp.role}</h3>
                  <p className="text-lg text-primary">{exp.company}</p>
                  
                  <div className="flex items-center gap-2 text-muted-foreground mt-2">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {format(new Date(exp.start_date), "MMM yyyy")} - {" "}
                      {exp.end_date ? format(new Date(exp.end_date), "MMM yyyy") : "Present"}
                    </span>
                    {exp.location && (
                      <>
                        <span>•</span>
                        <span>{exp.location}</span>
                      </>
                    )}
                  </div>
                  
                  {exp.description && (
                    <p className="text-foreground mt-4">{exp.description}</p>
                  )}
                  
                  {exp.highlights && exp.highlights.length > 0 && (
                    <ul className="list-disc list-inside space-y-1 mt-4 text-muted-foreground">
                      {exp.highlights.map((highlight, idx) => (
                        <li key={idx}>{highlight}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
