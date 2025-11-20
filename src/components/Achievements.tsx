import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Award, ExternalLink } from "lucide-react";
import { format } from "date-fns";

export const Achievements = () => {
  const { data: achievements } = useQuery({
    queryKey: ["achievements"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("achievements")
        .select("*")
        .order("date", { ascending: false });
      
      if (error) throw error;
      return data || [];
    },
  });

  return (
    <section id="achievements" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
          <span className="text-gradient">Achievements & Certifications</span>
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements?.map((achievement) => (
            <Card key={achievement.id} className="p-6 bg-card border-border card-hover">
              <div className="flex items-start gap-3 mb-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Award className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-foreground">{achievement.title}</h3>
                  {achievement.issuer && (
                    <p className="text-sm text-muted-foreground">{achievement.issuer}</p>
                  )}
                </div>
              </div>
              
              {achievement.description && (
                <p className="text-sm text-muted-foreground mb-4">{achievement.description}</p>
              )}
              
              <div className="flex items-center justify-between">
                {achievement.date && (
                  <span className="text-xs text-muted-foreground">
                    {format(new Date(achievement.date), "MMM yyyy")}
                  </span>
                )}
                
                {achievement.certificate_url && (
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="border-primary text-primary hover:bg-primary/10"
                  >
                    <a href={achievement.certificate_url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
