# Project Architecture

- Store each website chatbot thread in `chat_sessions` with ordered `chat_messages`; only server functions write conversations and only server-validated admins read them, preventing public transcript access.
- Serve the chatbot through the Lovable AI Gateway Responses API with the assigned OpenAI model and full in-thread history, ensuring grounded bilingual streaming answers.