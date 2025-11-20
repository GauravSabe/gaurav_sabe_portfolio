import { Github, Linkedin, Mail } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export const Footer = () => {
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
    <footer className="py-8 px-4 border-t border-border">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-muted-foreground text-sm">
          © {new Date().getFullYear()} {aboutMe?.name || "Gaurav Sabe"}. All rights reserved.
        </p>
        
        <div className="flex gap-4">
          <a
            href={aboutMe?.github_url || "https://github.com/GauravSabe"}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label="GitHub"
          >
            <Github className="h-5 w-5" />
          </a>
          
          <a
            href={aboutMe?.linkedin_url || "https://linkedin.com/in/gaurav-sabe"}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-5 w-5" />
          </a>
          
          <a
            href={`mailto:${aboutMe?.email || "gauravsabe1208@gmail.com"}`}
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label="Email"
          >
            <Mail className="h-5 w-5" />
          </a>
        </div>
      </div>
    </footer>
  );
};
