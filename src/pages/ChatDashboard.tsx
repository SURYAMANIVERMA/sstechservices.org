import { FormEvent, useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate, useParams } from "react-router-dom";
import { format } from "date-fns";
import type { Json } from "@/integrations/supabase/types";
import { Inbox, Languages, LogOut, MessageSquareText, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Message, MessageContent, MessageResponse } from "@/components/ai-elements/message";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

type SessionRow = {
  id: string;
  language: string;
  title: string;
  status: string;
  last_message_preview: string | null;
  started_at: string;
  updated_at: string;
};

type MessageRow = {
  id: string;
  role: string;
  parts: Json;
  created_at: string;
};

const messageText = (parts: Json) => {
  if (!Array.isArray(parts)) return "";
  return parts.map(part => {
    if (typeof part !== "object" || part === null || Array.isArray(part)) return "";
    return part.type === "text" && typeof part.text === "string" ? part.text : "";
  }).join("");
};

const ChatDashboard = () => {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [email, setEmail] = useState("info@sstechservices.org");
  const [password, setPassword] = useState("");
  const [authMode, setAuthMode] = useState<"signin" | "setup">("signin");
  const [notice, setNotice] = useState("");
  const [sessions, setSessions] = useState<SessionRow[]>([]);
  const [messages, setMessages] = useState<MessageRow[]>([]);
  const [loadingData, setLoadingData] = useState(false);

  useEffect(() => {
    if (!user) return;
    void supabase.rpc("claim_dashboard_access").then(async ({ data, error }) => {
      if (error || !data) {
        setNotice("This account is not authorized for the team dashboard.");
        return;
      }
      setLoadingData(true);
      const { data: rows, error: sessionError } = await supabase
        .from("chat_sessions")
        .select("*")
        .order("updated_at", { ascending: false });
      if (sessionError) setNotice(sessionError.message);
      else {
        setSessions(rows ?? []);
        if (!sessionId && rows?.[0]) navigate(`/dashboard/${rows[0].id}`, { replace: true });
      }
      setLoadingData(false);
    });
  }, [user, sessionId, navigate]);

  useEffect(() => {
    if (!user || !sessionId) {
      setMessages([]);
      return;
    }
    void supabase.from("chat_messages").select("id, role, parts, created_at")
      .eq("session_id", sessionId).order("created_at", { ascending: true })
      .then(({ data, error }) => {
        if (error) setNotice(error.message);
        else setMessages(data ?? []);
      });
  }, [user, sessionId]);

  const activeSession = useMemo(() => sessions.find(item => item.id === sessionId), [sessions, sessionId]);

  const submitAuth = async (event: FormEvent) => {
    event.preventDefault();
    setNotice("");
    if (email.toLowerCase() !== "info@sstechservices.org") {
      setNotice("Use the authorized SS TECH SERVICES email address.");
      return;
    }
    if (authMode === "setup") {
      const { error } = await supabase.auth.signUp({ email, password, options: { emailRedirectTo: `${window.location.origin}/dashboard` } });
      setNotice(error ? error.message : "Check the company inbox to confirm access, then sign in.");
      return;
    }
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setNotice(error.message);
  };

  if (authLoading) return <div className="min-h-[70vh] grid place-items-center text-muted-foreground">Loading…</div>;

  if (!user) {
    return (
      <section className="container min-h-[75vh] py-16 grid place-items-center">
        <Helmet><title>Team Dashboard | SS TECH SERVICES</title><meta name="robots" content="noindex,nofollow" /></Helmet>
        <div className="w-full max-w-md rounded-lg border border-border bg-card p-7 shadow-elegant">
          <img src="/ss-tech-logo.webp" alt="SS TECH SERVICES" className="mx-auto mb-5 h-16 w-16 object-contain" />
          <h1 className="text-center font-display text-2xl font-bold">Team conversation inbox</h1>
          <p className="mt-2 text-center text-sm text-muted-foreground">Secure access for SS TECH SERVICES staff.</p>
          <form onSubmit={submitAuth} className="mt-7 space-y-4">
            <div className="space-y-2"><Label htmlFor="team-email">Company email</Label><Input id="team-email" type="email" value={email} onChange={event => setEmail(event.target.value)} required /></div>
            <div className="space-y-2"><Label htmlFor="team-password">Password</Label><Input id="team-password" type="password" minLength={8} value={password} onChange={event => setPassword(event.target.value)} required /></div>
            {notice && <p className="rounded-md bg-secondary p-3 text-sm text-secondary-foreground">{notice}</p>}
            <Button className="w-full" type="submit">{authMode === "signin" ? "Sign in" : "Create team access"}</Button>
          </form>
          <Button variant="ghost" className="mt-2 w-full" onClick={() => setAuthMode(mode => mode === "signin" ? "setup" : "signin")}>
            {authMode === "signin" ? "First time? Create access" : "Already set up? Sign in"}
          </Button>
        </div>
      </section>
    );
  }

  return (
    <div className="container py-8 md:py-12">
      <Helmet><title>Chat Conversations | SS TECH SERVICES</title><meta name="robots" content="noindex,nofollow" /></Helmet>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div><div className="flex items-center gap-2 text-sm font-medium text-primary"><ShieldCheck className="h-4 w-4" /> Team only</div><h1 className="font-display text-3xl font-bold">Visitor conversations</h1></div>
        <Button variant="outline" onClick={() => void supabase.auth.signOut()}><LogOut className="mr-2 h-4 w-4" />Sign out</Button>
      </div>
      {notice && <p className="mb-4 rounded-md border border-border bg-secondary p-3 text-sm">{notice}</p>}
      <div className="grid min-h-[620px] overflow-hidden rounded-lg border border-border bg-card lg:grid-cols-[340px_1fr]">
        <aside className="border-b border-border lg:border-b-0 lg:border-r">
          <div className="flex h-16 items-center gap-2 border-b border-border px-5 font-semibold"><Inbox className="h-5 w-5 text-primary" /> Inbox <span className="ml-auto text-sm text-muted-foreground">{sessions.length}</span></div>
          <ScrollArea className="h-[280px] lg:h-[554px]">
            {loadingData && <p className="p-5 text-sm text-muted-foreground">Loading conversations…</p>}
            {!loadingData && sessions.length === 0 && <p className="p-5 text-sm text-muted-foreground">New visitor conversations will appear here.</p>}
            {sessions.map(session => (
              <Link key={session.id} to={`/dashboard/${session.id}`} className={cn("block border-b border-border px-5 py-4 transition-colors hover:bg-muted", session.id === sessionId && "bg-secondary")}>
                <div className="flex items-center gap-2"><span className="truncate font-medium">{session.title}</span><span className="ml-auto shrink-0 text-[10px] uppercase text-muted-foreground">{session.language}</span></div>
                <p className="mt-1 truncate text-sm text-muted-foreground">{session.last_message_preview ?? "Conversation started"}</p>
                <time className="mt-2 block text-xs text-muted-foreground">{format(new Date(session.updated_at), "dd MMM, h:mm a")}</time>
              </Link>
            ))}
          </ScrollArea>
        </aside>
        <section className="flex min-h-[520px] flex-col">
          {activeSession ? <>
            <header className="flex h-16 items-center gap-3 border-b border-border px-5"><MessageSquareText className="h-5 w-5 text-primary" /><div><h2 className="font-semibold">{activeSession.title}</h2><p className="flex items-center gap-1 text-xs text-muted-foreground"><Languages className="h-3 w-3" />{activeSession.language === "hi" ? "Hindi" : "English"} · {format(new Date(activeSession.started_at), "dd MMM yyyy, h:mm a")}</p></div></header>
            <ScrollArea className="h-[554px] p-5">
              <div className="mx-auto max-w-3xl space-y-6">
                {messages.map(message => <Message key={message.id} from={message.role === "user" ? "user" : "assistant"}><MessageContent className={message.role === "user" ? "bg-primary text-primary-foreground" : undefined}><MessageResponse>{messageText(message.parts)}</MessageResponse></MessageContent><time className={cn("text-[11px] text-muted-foreground", message.role === "user" && "text-right")}>{format(new Date(message.created_at), "h:mm a")}</time></Message>)}
              </div>
            </ScrollArea>
          </> : <div className="grid flex-1 place-items-center p-8 text-center text-muted-foreground"><div><MessageSquareText className="mx-auto mb-3 h-9 w-9" /><p>Select a conversation to read it.</p></div></div>}
        </section>
      </div>
    </div>
  );
};

export default ChatDashboard;