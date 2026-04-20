/**
 * Ali Code (Bailian Coding Plan) extension for pi
 *
 * Registers the DashScope Coding Plan provider with the dedicated
 * sk-sp- API key and endpoint.
 *
 * Requires a Coding Plan API key from Alibaba Model Studio.
 * Set via DASHSCOPE_CODING_API_KEY environment variable or edit this file.
 *
 * @see https://github.com/ricardo-nth/pi-ali-code
 */

import type { ExtensionAPI } from "@mariozechner/pi-coding-agent";

const API_KEY = process.env.DASHSCOPE_CODING_API_KEY ?? "YOUR_API_KEY";

export default function (pi: ExtensionAPI) {
  if (API_KEY === "YOUR_API_KEY") {
    console.warn("[pi-ali-code] No API key set. Export DASHSCOPE_CODING_API_KEY or edit index.ts");
    return;
  }

  pi.registerProvider("ali-code", {
    baseUrl: "https://coding-intl.dashscope.aliyuncs.com/v1",
    apiKey: API_KEY,
    api: "openai-completions",
    models: [
      {
        id: "qwen3.6-plus",
        name: "Qwen 3.6 Plus [Coding]",
        reasoning: true,
        input: ["text", "image"],
        cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
        contextWindow: 1000000,
        maxTokens: 65536,
        compat: { stringifyToolArguments: false, supportsDeveloperRole: false }
      },
      {
        id: "qwen3.5-plus",
        name: "Qwen 3.5 Plus [Coding]",
        reasoning: false,
        input: ["text", "image"],
        cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
        contextWindow: 1000000,
        maxTokens: 65536,
        compat: { stringifyToolArguments: false, supportsDeveloperRole: false }
      },
      {
        id: "qwen3-max-2026-01-23",
        name: "Qwen3 Max 2026-01-23 [Coding]",
        reasoning: true,
        input: ["text", "image"],
        cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
        contextWindow: 128000,
        maxTokens: 32768,
        compat: { stringifyToolArguments: false, supportsDeveloperRole: false }
      },
      {
        id: "qwen3-coder-next",
        name: "Qwen3 Coder Next [Coding]",
        reasoning: false,
        input: ["text"],
        cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
        contextWindow: 128000,
        maxTokens: 32768,
        compat: { stringifyToolArguments: false, supportsDeveloperRole: false }
      },
      {
        id: "qwen3-coder-plus",
        name: "Qwen3 Coder Plus [Coding]",
        reasoning: false,
        input: ["text"],
        cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
        contextWindow: 128000,
        maxTokens: 32768,
        compat: { stringifyToolArguments: false, supportsDeveloperRole: false }
      },
      {
        id: "glm-5",
        name: "GLM-5 [Coding]",
        reasoning: true,
        input: ["text"],
        cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
        contextWindow: 202752,
        maxTokens: 131072,
        compat: { stringifyToolArguments: false, supportsDeveloperRole: false }
      },
      {
        id: "glm-4.7",
        name: "GLM-4.7 [Coding]",
        reasoning: true,
        input: ["text", "image"],
        cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
        contextWindow: 202752,
        maxTokens: 8192,
        compat: { stringifyToolArguments: false, supportsDeveloperRole: false }
      },
      {
        id: "kimi-k2.5",
        name: "Kimi K2.5 [Coding]",
        reasoning: true,
        input: ["text", "image"],
        cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
        contextWindow: 262144,
        maxTokens: 32768,
        compat: { stringifyToolArguments: false, supportsDeveloperRole: false }
      },
      {
        id: "MiniMax-M2.5",
        name: "MiniMax M2.5 [Coding]",
        reasoning: true,
        input: ["text"],
        cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
        contextWindow: 1000000,
        maxTokens: 32768,
        compat: { stringifyToolArguments: false, supportsDeveloperRole: false }
      }
    ]
  });
}
