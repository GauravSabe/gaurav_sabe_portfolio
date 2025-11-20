import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, MessageSquare } from "lucide-react";
import { Contact } from "@/components/Contact";

export const ContactPreview = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold">
            <span className="text-gradient">Get In Touch</span>
          </h2>
        </div>

        <Contact />
      </div>
    </section>
  );
};
