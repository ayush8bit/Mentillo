
import { Card, CardContent } from "@/components/ui/card";
import { BookHeart } from "lucide-react";

const DepressionTips = () => {
  return (
    <div className="h-full w-full overflow-y-auto pb-16">
      <div className="p-4 space-y-4">
        <div className="flex items-center gap-2 mb-6">
          <BookHeart className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold tracking-tight">Mental Health Tips</h1>
        </div>

        <Card className="border-none shadow-md">
          <CardContent className="p-6 space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Feeling down? Don't worry, we've got your back with these science-backed tricks to lift your spirits!</h2>
              <p className="text-muted-foreground">Here are 5 expert-approved ways to tackle depression and come out on top.</p>
            </div>

            {[
              {
                title: "1. Get Your Zen On with Mindfulness Meditation",
                content: "Take a breather and focus on the here and now with some deep breathing. Studies (shoutout to Hofmann et al., 2010) say this can zap those pesky depressive thoughts—try it for 10 minutes a day!"
              },
              {
                title: "2. Shake It Off with a Quick Workout",
                content: "No need for a gym sesh—just a 20-minute walk can flood your brain with happy endorphins. Research (Blumenthal et al., 2007) proves it's a mood-lifter, so lace up those sneakers!"
              },
              {
                title: "3. Call Up Your BFF",
                content: "Text or call a pal—you'll be amazed how much better you feel. Science (Cohen & Wills, 1985) backs this up: a little chat can chase the blues away!"
              },
              {
                title: "4. Nail a Tiny Win",
                content: "Make your bed or tackle a small task—those little victories add up! Experts in cognitive-behavioral therapy (Beck, 1979) swear by this to kick helplessness to the curb."
              },
              {
                title: "5. Be Your Own Cheerleader",
                content: "Talk to yourself like you would a friend—self-compassion is key! Research (Neff, 2003) shows this can ditch self-criticism and boost your mood fast."
              }
            ].map((tip, index) => (
              <div key={index} className="p-4 bg-card rounded-lg space-y-2">
                <h3 className="font-semibold text-lg text-primary">{tip.title}</h3>
                <p className="text-muted-foreground">{tip.content}</p>
              </div>
            ))}

            <p className="text-lg font-medium text-center mt-6">
              Try these out and watch your vibe transform—because you deserve to feel amazing!
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DepressionTips;
