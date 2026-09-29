import { useEffect, useMemo, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { Bot, MessageSquareText, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Conversation, ConversationContent, ConversationEmptyState, ConversationScrollButton } from "@/components/ai-elements/conversation";
import { Message, MessageContent, MessageResponse } from "@/components/ai-elements/message";
import { PromptInput, PromptInputFooter, PromptInputSubmit, PromptInputTextarea } from "@/components/ai-elements/prompt-input";
import { Shimmer } from "@/components/ai-elements/shimmer";
import { useLanguage } from "@/contexts/LanguageContext";
import { COMPANY } from "@/lib/company";

const storageKey = "ss-tech-chat-session";
const newSessionId = () => crypto.randomUUID();
const functionUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/website-chatbot`;

const ChatThread = ({ sessionId }: { sessionId: string }) => {
  const { language, text } = useLanguage();
  const [input, setInput] = useState("");
  const transport = useMemo(() => new DefaultChatTransport<UIMessage>({
    api: functionUrl,
    headers: {
      apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
      Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
    },
    body: { sessionId, language },
  }), [sessionId, language]);
  const { messages, sendMessage, status, stop, error } = useChat({ id: sessionId, transport });
  const suggestions = language === "hi"
    ? ["आप कौन-कौन सी IT सेवाएँ देते हैं?", "प्रोजेक्ट की कीमत कैसे तय होती है?", "लखनऊ में onsite support मिलता है?"]
    : ["Which IT services do you provide?", "How is project pricing estimated?", "Do you offer onsite support in Lucknow?"];

  const send = async (value: string) => {
    const clean = value.trim();
    if (!clean || status === "submitted" || status === "streaming") return;
    setInput("");
    await sendMessage({ text: clean });
  };

  return <>
    <Conversation className="min-h-0 flex-1">
      <ConversationContent className="gap-5 px-5 py-5">
        {messages.length === 0 && <ConversationEmptyState className="justify-start p-0 text-left" icon={<img src={COMPANY.logo} alt="" className="h-12 w-12 object-contain" />} title={text("Namaste! How can we help?", "नमस्ते! हम आपकी कैसे मदद कर सकते हैं?")} description={text("Ask about our IT services, pricing guidance or project capabilities.", "हमारी IT सेवाओं, कीमत मार्गदर्शन या प्रोजेक्ट क्षमताओं के बारे में पूछें।")}>
          <div className="w-full space-y-2">
            <div className="mb-4 flex items-start gap-3"><img src={COMPANY.logo} alt="SS TECH SERVICES assistant" className="h-11 w-11 object-contain" /><div><h3 className="font-semibold">{text("Namaste! How can we help?", "नमस्ते! हम आपकी कैसे मदद कर सकते हैं?")}</h3><p className="mt-1 text-sm text-muted-foreground">{text("Ask about our IT services, pricing guidance or project capabilities.", "हमारी IT सेवाओं, कीमत मार्गदर्शन या प्रोजेक्ट क्षमताओं के बारे में पूछें।")}</p></div></div>
            {suggestions.map(suggestion => <Button key={suggestion} type="button" variant="outline" className="h-auto w-full justify-start whitespace-normal py-3 text-left" onClick={() => void send(suggestion)}>{suggestion}</Button>)}
          </div>
        </ConversationEmptyState>}
        {messages.map(message => <Message key={message.id} from={message.role}><MessageContent className={message.role === "user" ? "bg-primary text-primary-foreground" : undefined}>{message.parts.map((part, index) => part.type === "text" ? <MessageResponse key={`${message.id}-${index}`}>{part.text}</MessageResponse> : null)}</MessageContent></Message>)}
        {status === "submitted" && <div className="flex items-center gap-2 text-sm text-muted-foreground"><Bot className="h-4 w-4 text-primary" /><Shimmer>{text("Preparing an answer…", "उत्तर तैयार हो रहा है…")}</Shimmer></div>}
        {error && <p className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">{error.message}</p>}
      </ConversationContent>
      <ConversationScrollButton />
    </Conversation>
    <div className="border-t border-border p-4">
      <PromptInput onSubmit={({ text: value }) => send(value)}>
        <PromptInputTextarea value={input} onChange={event => setInput(event.target.value)} maxLength={800} placeholder={text("Ask about services, pricing or projects…", "सेवाओं, कीमत या प्रोजेक्ट के बारे में पूछें…")} />
        <PromptInputFooter>
          <span className="text-[11px] text-muted-foreground">{text("Final pricing requires assessment.", "अंतिम कीमत के लिए असेसमेंट जरूरी है।")}</span>
          <PromptInputSubmit status={status} onStop={() => void stop()} disabled={!input.trim() && status === "ready"} />
        </PromptInputFooter>
      </PromptInput>
      <div className="mt-3 flex justify-center gap-4 text-xs font-medium"><a href={`tel:${COMPANY.phoneRaw}`} className="text-primary hover:underline">{text("Call team", "टीम को कॉल करें")}</a><a href={`https://wa.me/${COMPANY.whatsapp}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">WhatsApp</a></div>
    </div>
  </>;
};

export const AIChatbot = () => {
  const { text } = useLanguage();
  const [open, setOpen] = useState(false);
  const [sessionId, setSessionId] = useState(() => localStorage.getItem(storageKey) ?? newSessionId());
  useEffect(() => localStorage.setItem(storageKey, sessionId), [sessionId]);
  const reset = () => setSessionId(newSessionId());

  return <Sheet open={open} onOpenChange={setOpen}>
    <SheetTrigger asChild><Button size="icon" aria-label={text("Open AI assistant", "AI सहायक खोलें")} className="fixed bottom-5 right-24 z-40 h-14 w-14 rounded-full shadow-elegant"><MessageSquareText className="h-6 w-6" /></Button></SheetTrigger>
    <SheetContent side="right" className="flex h-full w-full flex-col gap-0 p-0 sm:max-w-md">
      <SheetHeader className="border-b border-border px-5 py-4 pr-12 text-left"><div className="flex items-center gap-3"><img src={COMPANY.logo} alt="SS TECH SERVICES" className="h-10 w-10 object-contain" /><div className="min-w-0"><SheetTitle>{text("SS TECH AI Assistant", "SS TECH AI सहायक")}</SheetTitle><SheetDescription>{text("Services, pricing and projects", "सेवाएँ, कीमत और प्रोजेक्ट")}</SheetDescription></div><Button type="button" variant="ghost" size="icon" className="ml-auto shrink-0" onClick={reset} title={text("New conversation", "नई बातचीत")} aria-label={text("New conversation", "नई बातचीत")}><Plus className="h-5 w-5" /></Button></div></SheetHeader>
      <ChatThread key={sessionId} sessionId={sessionId} />
    </SheetContent>
  </Sheet>;
};