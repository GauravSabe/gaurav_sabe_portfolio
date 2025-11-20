import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Card } from "@/components/ui/card";

export const About = () => {
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
    <section id="about" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
          <span className="text-gradient">About Me</span>
        </h2>
        
        <Card className="p-8 md:p-12 bg-card border-border card-hover">
          <div className="prose prose-invert max-w-none">
            <p className="text-lg text-foreground leading-relaxed">
              {aboutMe?.summary || "Motivated Java Developer experienced in building scalable full-stack applications using Spring Boot and React. Skilled in crafting secure REST APIs, microservices architectures, integrating AI solutions, and working in Agile environments. Strong problem-solving and debugging ability."}
            </p>
          </div>
        </Card>
      </div>
    </section>
  );
};
