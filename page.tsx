import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const secretLayers = [
  {
    label: "Cinematic Film Still",
    template:
      "film still, shot on kodak vision3 500T, 35mm, {{subject}}, cinematic lighting by Roger Deakins, heavy contrast, shallow depth of field, scanned from criterion collection archive",
    points: 100,
  },
  {
    label: "Photorealistic RAW File",
    template:
      "IMG_00932.CR2, taken with Canon 5D Mark IV, RAW file, {{subject}}, shallow depth, natural lens distortion, realistic lighting",
    points: 90,
  },
  {
    label: "Found Footage Metadata",
    template:
      "dashcam footage, timestamp 03:42:17, 2047-11-03, {{subject}}, night vision mode, grainy feed, glitch distortion, JPEG artifacts",
    points: 85,
  },
  {
    label: "Unreal Engine Render",
    template:
      "Unreal Engine 5 render, {{subject}}, ray-traced lighting, nanite mesh enabled, AAA game quality, cinematic fog",
    points: 80,
  },
  {
    label: "Vintage 35mm Film",
    template:
      "shot on Contax T2, Fuji Superia 400 film, {{subject}}, blurry background, warm tones, light leak in corner, analog scan",
    points: 95,
  },
  {
    label: "🔥 Super Secret Prompt",
    template:
      "IMG_9854.CR2, top secret project archive, classified AI-lab photo documentation of {{subject}}, ultra-detailed, cinematic color, experimental lens prototype",
    points: 150,
    unlockLevel: 5
  }
];

export default function DynamicPromptGenerator() {
  const [subject, setSubject] = useState("");
  const [prompts, setPrompts] = useState([]);
  const [xp, setXP] = useState(0);
  const [level, setLevel] = useState(1);

  useEffect(() => {
    const newLevel = Math.floor(xp / 300) + 1;
    if (newLevel !== level) setLevel(newLevel);
  }, [xp]);

  const generatePrompts = () => {
    if (!subject) return;
    let totalPoints = 0;
    const generated = secretLayers
      .filter(({ unlockLevel }) => !unlockLevel || level >= unlockLevel)
      .map(({ label, template, points }) => {
        totalPoints += points;
        return {
          label,
          prompt: template.replace("{{subject}}", subject),
        };
      });
    setPrompts(generated);
    setXP(prev => prev + totalPoints);
  };

  const getThemeClass = () => {
    if (level >= 5) return "bg-gradient-to-br from-black via-gray-900 to-purple-900 text-purple-100 font-mono";
    if (level >= 3) return "bg-gradient-to-br from-blue-900 to-indigo-800 text-white";
    return "bg-white text-black";
  };

  return (
    <div className={`p-6 min-h-screen ${getThemeClass()} transition-all duration-500`}> 
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-center">🎮 Dynamic Prompt Generator RPG</h1>
        <div className="flex justify-between items-center">
          <div className="text-sm">Level: {level}</div>
          <div className="text-sm">XP: {xp}</div>
        </div>
        <div className="w-full bg-gray-300 rounded-full h-3">
          <div
            className="bg-green-500 h-3 rounded-full transition-all duration-300"
            style={{ width: `${(xp % 300) / 3}%` }}
          ></div>
        </div>
        <Input
          placeholder="Enter your subject (e.g., cyberpunk samurai)"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <Button onClick={generatePrompts} className="w-full">
          Generate Prompts + Earn XP 💥
        </Button>

        {prompts.length > 0 && (
          <div className="space-y-4">
            {prompts.map(({ label, prompt }, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <h2 className="font-semibold mb-2">{label}</h2>
                  <p className="text-sm whitespace-pre-line">{prompt}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="mt-10 p-4 border rounded bg-white/10 text-sm text-center">
          🌐 <strong>Community Leaderboards & Sharing</strong> coming soon! You'll be able to submit your most creative combos to earn badges and get ranked.
        </div>
      </div>
    </div>
  );
}