import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const FeedbackForm = () => {
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (feedback.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-soft p-6">
      <div className="max-w-2xl w-full mx-auto text-center animate-fade-in">
        <h2 className="text-4xl md:text-6xl font-bold text-primary mb-8 animate-heart-beat">
          Did you like it????? 💕
        </h2>
        
        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <Textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Type your answer here..."
              className="min-h-[150px] text-lg bg-soft-pink border-primary/30 focus:border-primary text-primary-foreground"
              required
            />
            <Button
              type="submit"
              size="lg"
              className="bg-gradient-romantic text-white font-bold text-xl px-10 py-6 rounded-full shadow-glow hover:scale-110 transition-transform"
            >
              Submit 💖
            </Button>
          </form>
        ) : (
          <div className="bg-soft-pink rounded-3xl shadow-romantic p-8 animate-scale-in">
            <p className="text-xl md:text-2xl text-primary-foreground mb-4">
              "{feedback}"
            </p>
            <p className="text-lg md:text-xl text-primary font-medium">
              tony, I didn't connect backend here so copy paste text and send me on insta and I'll get it 😂
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeedbackForm;
