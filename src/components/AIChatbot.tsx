import { FormEvent, useEffect, useRef, useState } from "react";
import { Bot, Loader2, MessageSquareText, Send, Sparkles, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { COMPANY } from "@/lib/company";

type ChatMessage = { role: "user" | "assistant"; content: string };

export const AIChatbot = () => {
  const { language, text } = useLanguage();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const endRef = useRef<HTMLDivElement>(null);
  const suggestions = language === "hi"
    ? ["आप कौन-कौन सी IT सेवाएँ देते हैं?", "प्रोजेक्ट की कीमत कैसे तय होती है?", "लखनऊ में onsite support मिलता है?"]
    : ["Which IT services do you provide?", "How is project pricing estimated?", "Do you offer onsite support in Lucknow?"];

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, loading]);

  const send = async (value: string) => {
    const content = value.trim();
    if (!content || loading) return;
    const nextMessages = [...messages, { role: "user" as const, content }].slice(-10);
    setMessages(nextMessages);
    setInput("");
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("website-chatbot", {
        body: { language, messages: nextMessages },
      });
      if (error) throw error;
      if (!data?.reply) throw new Error("Empty chatbot reply");
      setMessages(current => [...current, { role: "assistant", content: data.reply }]);
    } catch (error) {
      console.error("chatbot failed", error);
      setMessages(current => [...current, {
        role: "assistant",
        content: text("I’m temporarily unavailable. Please call or WhatsApp our team for immediate help.", "मैं अभी उपलब्ध नहीं हूँ। तुरंत सहायता के लिए हमारी टीम को कॉल या WhatsApp करें।"),
      }]);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    void send(input);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button size="icon" aria-label={text("Open AI assistant", "AI सहायक खोलें")} className="fixed bottom-5 right-24 z-40 h-14 w-14 rounded-full shadow-elegant">
          <MessageSquareText className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="flex h-full w-full flex-col gap-0 p-0 sm:max-w-md">
        <SheetHeader className="border-b border-border px-5 py-5 pr-12 text-left">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-md bg-primary text-primary-foreground"><Sparkles className="h-5 w-5" /></span>
            <div>
              <SheetTitle>{text("SS TECH AI Assistant", "SS TECH AI सहायक")}</SheetTitle>
              <SheetDescription>{text("Services, pricing guidance and project enquiries", "सेवाएँ, कीमत मार्गदर्शन और प्रोजेक्ट जानकारी")}</SheetDescription>
            </div>
          </div>
        </SheetHeader>

        <ScrollArea className="min-h-0 flex-1 px-5 py-5">
          {messages.length === 0 && (
            <div className="space-y-5">
              <div className="rounded-md border border-border bg-secondary p-4">
                <Bot className="mb-3 h-6 w-6 text-primary" />
                <p className="text-sm leading-relaxed">{text("Namaste! Ask me about SS TECH SERVICES, project planning or indicative pricing. I’ll connect you with our team when a site assessment is needed.", "नमस्ते! SS TECH SERVICES, प्रोजेक्ट योजना या अनुमानित कीमत के बारे में पूछें। साइट असेसमेंट की जरूरत होने पर मैं आपको हमारी टीम से जोड़ूँगा।")}</p>
              </div>
              <div className="space-y-2">
                {suggestions.map(suggestion => (
                  <Button key={suggestion} variant="outline" className="h-auto w-full justify-start whitespace-normal py-3 text-left" onClick={() => void send(suggestion)}>{suggestion}</Button>
                ))}
              </div>
            </div>
          )}
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div key={`${message.role}-${index}`} className={`flex gap-2 ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                {message.role === "assistant" && <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-secondary"><Bot className="h-4 w-4 text-primary" /></span>}
                <div className={`max-w-[82%] whitespace-pre-wrap rounded-md px-4 py-3 text-sm leading-relaxed ${message.role === "user" ? "bg-primary text-primary-foreground" : "border border-border bg-card"}`}>{message.content}</div>
                {message.role === "user" && <UserRound className="mt-2 h-4 w-4 shrink-0 text-muted-foreground" />}
              </div>
            ))}
            {loading && <div className="flex items-center gap-2 text-sm text-muted-foreground"><Loader2 className="h-4 w-4 animate-spin" />{text("Preparing an answer…", "उत्तर तैयार हो रहा है…")}</div>}
            <div ref={endRef} />
          </div>
        </ScrollArea>

        <div className="border-t border-border p-4">
          <form onSubmit={onSubmit} className="flex items-end gap-2">
            <Textarea value={input} onChange={event => setInput(event.target.value)} onKeyDown={event => { if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); void send(input); } }} maxLength={800} rows={2} placeholder={text("Ask about services, pricing or projects…", "सेवाओं, कीमत या प्रोजेक्ट के बारे में पूछें…")} className="min-h-[52px] resize-none" />
            <Button type="submit" size="icon" disabled={loading || !input.trim()} aria-label={text("Send message", "संदेश भेजें")}><Send className="h-4 w-4" /></Button>
          </form>
          <p className="mt-2 text-center text-[11px] text-muted-foreground">{text("Indicative guidance only. Final scope and pricing require assessment.", "यह प्रारंभिक मार्गदर्शन है। अंतिम कार्यक्षेत्र और कीमत के लिए असेसमेंट जरूरी है।")}</p>
          <div className="mt-3 flex justify-center gap-4 text-xs font-medium">
            <a href={`tel:${COMPANY.phoneRaw}`} className="text-primary hover:underline">{text("Call team", "टीम को कॉल करें")}</a>
            <a href={`https://wa.me/${COMPANY.whatsapp}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">WhatsApp</a>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};