import { ChatPromptTemplate, HumanMessagePromptTemplate, SystemMessagePromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import { ChatOpenAI } from "@langchain/openai";
import { StructuredOutputParser } from "langchain/output_parsers";
import { z } from "zod";

// Function to create and run the summarization chain
export async function createSummarizationChain(readmeContent: string) {
  // Define schema for structured output
  const parser = StructuredOutputParser.fromZodSchema(
    z.object({
      summary: z.string().describe("A concise summary of the GitHub repository based on the README content"),
      cool_facts: z.array(z.string()).describe("A list of interesting and notable facts extracted from the repository README")
    })
  );

  // Create system and human message templates
  const systemTemplate = SystemMessagePromptTemplate.fromTemplate(
    "You are a technical analyst that provides concise repository summaries."
  );
  
  // Get format instructions
  const formatInstructions = parser.getFormatInstructions();
  
  // Create human message with raw content to avoid template issues
  const humanTemplate = HumanMessagePromptTemplate.fromTemplate(
    "Please analyze and summarize this GitHub repository README content.\n\nREADME CONTENT:\n{readme_content}\n\n{format_instructions}"
  );

  // Create the prompt template with format instructions
  const prompt = ChatPromptTemplate.fromMessages([
    systemTemplate,
    humanTemplate
  ]);

  // Initialize the model
  const model = new ChatOpenAI({
    modelName: "gpt-3.5-turbo",
    temperature: 0.5
  });

  // Create the chain using LCEL
  const chain = RunnableSequence.from([
    {
      readme_content: (input: string) => input,
      format_instructions: () => formatInstructions
    },
    prompt,
    model,
    parser
  ]);

  // Execute the chain
  const response = await chain.invoke(readmeContent);

  return response;
} 