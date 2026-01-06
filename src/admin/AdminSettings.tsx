import { useEffect, useState } from "react";
import { API_URL, SECRET_KEY } from "@/config";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function AdminSettings() {
  const [settings, setSettings] = useState<any[]>([]);

  useEffect(() => {
    fetch(API_URL, {
      method: "POST",
      body: JSON.stringify({
        action: "admin",
        secret: SECRET_KEY,
        role: "admin"
      })
    })
      .then(r => r.json())
      .then(d => setSettings(d.settings || []));
  }, []);

  const save = (key: string, value: string) => {
    fetch(API_URL, {
      method: "POST",
      body: JSON.stringify({
        action: "savesetting",
        secret: SECRET_KEY,
        key,
        value
      })
    }).then(() => alert("Saved"));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Website & Business Settings</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {settings.map((s, i) => i > 0 && (
          <div key={i} className="p-4 border rounded-xl">
            <p className="text-sm text-muted-foreground">{s[0]}</p>
            <Input
              defaultValue={s[1]}
              onBlur={(e) => save(s[0], e.target.value)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
