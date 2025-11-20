import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { GraduationCap, Calendar, Award } from "lucide-react";

export const EducationPreview = () => {
  return (
    <section className="py-20 px-4 bg-secondary/20">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-center">
            <span className="text-gradient">Education</span>
          </h2>
        </div>

        <Card className="bg-card border-border card-hover group max-w-4xl mx-auto">
          <CardHeader className="pb-3">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                <GraduationCap className="h-8 w-8 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                  B.E. Electronics & Telecommunication Engineering
                </h3>
                <p className="text-lg text-muted-foreground mt-1">
                  Dr. D. Y. Patil Institute of Technology, Pune
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-6 mt-4">
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">CGPA</p>
                  <p className="text-lg font-semibold text-foreground">7.78</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Duration</p>
                  <p className="text-lg font-semibold text-foreground">2022 – 2026</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
