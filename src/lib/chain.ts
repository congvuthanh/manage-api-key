import { ChatPromptTemplate, HumanMessagePromptTemplate, SystemMessagePromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";
import { z } from "zod";

// Function to create and run the summarization chain
export async function createSummarizationChain(readmeContent: string) {
  // Define schema for structured output
  const schema = z.object({
    summary: z.string().describe("A concise summary of the GitHub repository based on the README content"),
    cool_facts: z.array(z.string()).describe("A list of interesting and notable facts extracted from the repository README")
  });

  // Create system and human message templates
  const systemTemplate = SystemMessagePromptTemplate.fromTemplate(
    "You are a technical analyst that provides concise repository summaries."
  );
  
  // Create human message template
  const humanTemplate = HumanMessagePromptTemplate.fromTemplate(
    "Please analyze and summarize this GitHub repository README content.\n\nREADME CONTENT:\n{readme_content}"
  );

  // Create the prompt template
  const prompt = ChatPromptTemplate.fromMessages([
    systemTemplate,
    humanTemplate
  ]);

  // Initialize the model with structured output
  const model = new ChatOpenAI({
    modelName: "gpt-3.5-turbo",
    temperature: 0.5,
  }).withStructuredOutput(schema);

  // Create the chain using LCEL
  const chain = prompt.pipe(model);

  // Execute the chain
  const response = await chain.invoke({
    readme_content: readmeContent
  });

  return response;
} 