CREATE UNIQUE INDEX chat_messages_session_ai_message_idx
ON public.chat_messages (session_id, ai_message_id)
WHERE ai_message_id IS NOT NULL;