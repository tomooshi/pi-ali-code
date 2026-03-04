# pi-ali-code

A [pi](https://github.com/badlogic/pi) extension that adds [Alibaba Model Studio Coding Plan](https://www.alibabacloud.com/en/solutions/generative-ai/model-studio) models as a provider.

## What is the Coding Plan?

Alibaba's Model Studio offers a **Coding Plan** — a dedicated tier with its own API key (`sk-sp-*`) and endpoint that provides access to multiple model families at reduced or zero cost:

- **Qwen** — Qwen 3.5 Plus, Qwen3 Max, Qwen3 Coder Next/Plus
- **GLM** — GLM-5, GLM-4.7
- **Kimi** — Kimi K2.5
- **MiniMax** — MiniMax M2.5

## Problem

The Coding Plan uses a dedicated endpoint (`coding-intl.dashscope.aliyuncs.com`) and API key format (`sk-sp-*`) that differs from the standard DashScope API. Additionally, the DashScope API has compatibility issues with pi's default OpenAI API handling:

- Tool arguments must be JSON objects, not stringified JSON
- The `developer` role is not supported (must use `system` instead)

## Installation

### Option 1: NPM Package (Recommended)

```bash
npm install -g pi-ali-code
```

Add to `~/.pi/agent/settings.json`:
```json
{
  "packages": [
    "npm:pi-ali-code@1.0.0"
  ]
}
```

### Option 2: Local Installation

```bash
git clone https://github.com/ricardo-nth/pi-ali-code.git ~/.pi/agent/extensions/ali-code
```

Add to `~/.pi/agent/settings.json`:
```json
{
  "packages": [
    "./extensions/ali-code"
  ]
}
```

## Configuration

### 1. Get a Coding Plan API Key

1. Go to [Alibaba Model Studio](https://www.alibabacloud.com/en/solutions/generative-ai/model-studio)
2. Subscribe to the **Coding Plan**
3. Copy your dedicated API key (starts with `sk-sp-`)

### 2. Set the Environment Variable

```bash
export DASHSCOPE_CODING_API_KEY="sk-sp-your-key-here"
```

Add this to your shell profile (`~/.zshrc`, `~/.bashrc`, etc.) to persist it.

### 3. Restart pi

The models will appear in the model picker with a `[Coding]` suffix.

## Available Models

| Model | ID | Reasoning | Vision |
|---|---|---|---|
| Qwen 3.5 Plus | `qwen3.5-plus` | No | Yes |
| Qwen3 Max | `qwen3-max-2026-01-23` | Yes | Yes |
| Qwen3 Coder Next | `qwen3-coder-next` | No | No |
| Qwen3 Coder Plus | `qwen3-coder-plus` | No | No |
| GLM-5 | `glm-5` | Yes | No |
| GLM-4.7 | `glm-4.7` | Yes | Yes |
| Kimi K2.5 | `kimi-k2.5` | Yes | No |
| MiniMax M2.5 | `MiniMax-M2.5` | Yes | No |

## Related

- [pi-qwen-fix](https://github.com/ricardo-nth/pi-qwen-fix) — Fixes for the standard `alibaba-qwen` provider in pi

## License

MIT
