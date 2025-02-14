import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Plus, Wand2 } from "lucide-react";
import { useChatStore } from "@/store/chat.store";
import { useAuthStore } from "@/store/auth.store";
import { toast } from "sonner";
import { bot } from "@/services/bot";
import { Textarea } from "@/components/ui/textarea";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { botKeys } from "@/lib/query-keys";

const BOT_CATEGORIES = [
  { id: "education", name: "Education" },
  { id: "coding", name: "Coding" },
  { id: "writing", name: "Writing" },
  { id: "math", name: "Math" },
] as const;

interface CreateBotData {
  bot_name: string;
  bot_category: string;
  bot_instruction: string;
}

export function CreateBotDialog() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [category, setCategory] = useState<string>(BOT_CATEGORIES[0].id);
  const [instruction, setInstruction] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const { user } = useAuthStore();
  const { addSession } = useChatStore();
  const queryClient = useQueryClient();

  const generateInstruction = async () => {
    if (!name || !category) {
      toast.error("Please fill in bot name and category first");
      return;
    }

    setIsGenerating(true);
    try {
      const response = await bot.create({
        bot_name: name,
        bot_category: category,
        bot_instruction: "",
      });

      if (response.success) {
        setInstruction(response.data.instruction);
        toast.success("Instruction generated successfully");
      }
    } catch (error) {
      toast.error("Failed to generate instruction");
      console.error("Failed to generate instruction:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const createBotMutation = useMutation({
    mutationFn: (data: CreateBotData) => bot.create(data),
    onSuccess: (response) => {
      const { bot_id, bot_name, bot_category } = response.data;

      addSession({
        id: bot_id,
        name: bot_name,
        bot_type: bot_category,
        created_at: new Date().toISOString(),
      });

      // Invalidate and refetch bot list
      queryClient.invalidateQueries({
        queryKey: botKeys.lists(),
      });

      setOpen(false);
      resetForm();
      toast.success("Bot created successfully");
    },
    onError: (error: Error) => {
      toast.error("Failed to create bot", {
        description: error.message,
      });
    },
  });

  const resetForm = () => {
    setName("");
    setCategory(BOT_CATEGORIES[0].id);
    setInstruction("");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please login to create a bot");
      return;
    }
    
    if (!name.trim()) {
      toast.error("Please enter a bot name");
      return;
    }

    if (!instruction.trim()) {
      toast.error("Please add bot instruction");
      return;
    }

    createBotMutation.mutate({
      bot_name: name,
      bot_category: category,
      bot_instruction: instruction,
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Plus className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
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
              disabled={createBotMutation.isPending}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Bot Category</Label>
            <Select 
              value={category} 
              onValueChange={setCategory}
              disabled={createBotMutation.isPending}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select bot category" />
              </SelectTrigger>
              <SelectContent>
                {BOT_CATEGORIES.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="instruction">Bot Instruction</Label>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={generateInstruction}
                disabled={isGenerating || createBotMutation.isPending}
                className="h-8 px-2"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Wand2 className="h-4 w-4 mr-1" />
                    Generate
                  </>
                )}
              </Button>
            </div>
            <Textarea
              id="instruction"
              value={instruction}
              onChange={(e) => setInstruction(e.target.value)}
              placeholder="Enter instructions for your bot..."
              className="h-32 resize-none"
              required
              disabled={createBotMutation.isPending}
            />
            <p className="text-xs text-muted-foreground">
              Describe how your bot should behave and what kind of responses it
              should provide.
            </p>
          </div>
          <Button 
            type="submit" 
            className="w-full" 
            disabled={createBotMutation.isPending || isGenerating}
          >
            {createBotMutation.isPending ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Creating Bot...
              </>
            ) : (
              "Create Bot"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
