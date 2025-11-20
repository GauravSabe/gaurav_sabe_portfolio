import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Trophy, Languages } from "lucide-react";

export const AchievementsPreview = () => {
  const achievements = [
    {
      id: 1,
      icon: Award,
      title: "Java + DSA + System Design Certification",
      issuer: "PW Skills",
      type: "Certification",
    },
    {
      id: 2,
      icon: Trophy,
      title: "President",
      issuer: "ENTC Coding Club",
      type: "Leadership",
    },
    {
      id: 3,
      icon: Languages,
      title: "Languages",
      issuer: "English, Hindi, Marathi",
      type: "Communication",
    },
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-center">
            <span className="text-gradient">Achievements & Certifications</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((achievement) => {
            const IconComponent = achievement.icon;
            return (
              <Card 
                key={achievement.id} 
                className="p-6 bg-card border-border card-hover group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-500" />
                
                <div className="relative z-10">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                      <IconComponent className="h-6 w-6 text-primary" />
                    </div>
                    <Badge 
                      variant="outline" 
                      className="border-primary/50 text-primary text-xs"
                    >
                      {achievement.type}
                    </Badge>
                  </div>
                  
                  <h3 className="font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {achievement.title}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground">
                    {achievement.issuer}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
