import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";
import { useChatStore } from "@/store/chat.store";
import { useAuthStore } from "@/store/auth.store";
import { toast } from "sonner";

const BOT_TYPES = [
  { id: "general", name: "General Assistant" },
  { id: "code", name: "Code Assistant" },
  { id: "writing", name: "Writing Assistant" },
  { id: "math", name: "Math Assistant" },
] as const;

export function CreateBotDialog() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [botType, setBotType] = useState<string>(BOT_TYPES[0].id);
  const { user } = useAuthStore();
  const { addSession } = useChatStore();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!user) return;

    try {
      // Here you would typically make an API call to create a new bot
      const newSession = {
        id: Date.now().toString(),
        name,
        bot_type: botType,
        created_at: new Date().toISOString(),
      };

      addSession(newSession);
      setOpen(false);
      setName("");
      setBotType(BOT_TYPES[0].id);
      toast.success("Bot created successfully");
    } catch (error) {
      toast.error("Failed to create bot");
      console.error("Failed to create bot:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Plus className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Bot</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Bot Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="My Assistant"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="type">Bot Type</Label>
            <Select value={botType} onValueChange={setBotType}>
              <SelectTrigger>
                <SelectValue placeholder="Select bot type" />
              </SelectTrigger>
              <SelectContent>
                {BOT_TYPES.map((type) => (
                  <SelectItem key={type.id} value={type.id}>
                    {type.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="w-full">
            Create Bot
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
} 