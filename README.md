# pi-ali-code

A [pi](https://github.com/mariozechner/pi) extension that adds [Alibaba Model Studio Coding Plan](https://www.alibabacloud.com/en/solutions/generative-ai/model-studio) models as a provider.

> Fork of [ricardo-nth/pi-ali-code](https://github.com/ricardo-nth/pi-ali-code) with the roster synced to the Coding Plan Pro tier as of **2026-04-15**, corrected reasoning/vision capability flags, and `qwen3.6-plus` added.

## What is the Coding Plan?

Alibaba's Model Studio offers a **Coding Plan** — a dedicated tier with its own API key (`sk-sp-*`) and endpoint that provides access to multiple model families at a flat monthly rate:

- **Qwen** — Qwen 3.6 Plus (Pro only), 3.5 Plus, Qwen3 Max, Qwen3 Coder Next/Plus
- **Zhipu (GLM)** — GLM-5, GLM-4.7
- **Kimi** — Kimi K2.5
- **MiniMax** — MiniMax M2.5

Coding Plan quota (Pro): 6k req / 5h, 45k / week, 90k / month. Each pi turn typically costs 5–30 requests depending on complexity, context, and tool usage.

## Why this extension exists

The Coding Plan uses a dedicated endpoint (`coding-intl.dashscope.aliyuncs.com`) and API key format (`sk-sp-*`) that differs from the standard DashScope pay-as-you-go API. It is **not** interchangeable with the normal DashScope key (`sk-*`).

DashScope's OpenAI-compatible surface also has two compat quirks vs. upstream OpenAI that pi must be told about:

- Tool arguments must be JSON objects, not stringified JSON
- The `developer` role is not supported (use `system` instead)

This extension wires both up.

## Installation

### Local (recommended while the roster churns)

```bash
git clone https://github.com/tomooshi/pi-ali-code.git ~/.pi/agent/extensions/ali-code
```

Add to `~/.pi/agent/settings.json`:
```json
{
  "packages": [
    "./extensions/ali-code"
  ]
}
```

Pull updates later:
```bash
cd ~/.pi/agent/extensions/ali-code && git pull
```

### Upstream npm package

The original upstream publishes `pi-ali-code` on npm but its model list lags the Coding Plan console. If you want that version:

```bash
npm install -g pi-ali-code
```
```json
{ "packages": ["npm:pi-ali-code@1.0.0"] }
```

## Configuration

### 1. Get a Coding Plan API key

1. Go to [Alibaba Model Studio](https://www.alibabacloud.com/en/solutions/generative-ai/model-studio) and subscribe to the **Coding Plan** (Pro is required for `qwen3.6-plus`; Lite is closed to new subscribers as of 2026-03-20).
2. On the Coding Plan page, copy your plan-specific API key. It starts with `sk-sp-`.

> The `sk-sp-*` key and `coding-intl.dashscope.aliyuncs.com` base URL are **different** from the pay-as-you-go DashScope key (`sk-*`) and endpoint. Do not swap them.

### 2. Set the environment variable

```bash
echo 'export DASHSCOPE_CODING_API_KEY="sk-sp-your-key-here"' >> ~/.bashrc
source ~/.bashrc
```

(Use `~/.zshrc` for zsh.)

### 3. Restart pi

Models appear in the model picker with a `[Coding]` suffix under provider `ali-code`. Switch with `/model`.

## Available Models

Synced to the Coding Plan Pro roster as of **2026-04-15**. Capability flags follow the "Model Capabilities" column on the Alibaba Coding Plan page.

| Model | ID | Reasoning | Vision | Context | Max Output |
|---|---|---|---|---|---|
| Qwen 3.6 Plus *(Pro only)* | `qwen3.6-plus` | ✅ | ✅ | 1,000,000 | 65,536 |
| Qwen 3.5 Plus | `qwen3.5-plus` | ✅ | ✅ | 1,000,000 | 65,536 |
| Qwen3 Max 2026-01-23 | `qwen3-max-2026-01-23` | ✅ | ❌ | 128,000 | 32,768 |
| Qwen3 Coder Next | `qwen3-coder-next` | ❌ | ❌ | 128,000 | 32,768 |
| Qwen3 Coder Plus | `qwen3-coder-plus` | ❌ | ❌ | 128,000 | 32,768 |
| GLM-5 | `glm-5` | ✅ | ❌ | 202,752 | 131,072 |
| GLM-4.7 | `glm-4.7` | ✅ | ❌ | 202,752 | 8,192 |
| Kimi K2.5 | `kimi-k2.5` | ✅ | ✅ | 262,144 | 32,768 |
| MiniMax M2.5 | `MiniMax-M2.5` | ✅ | ❌ | 1,000,000 | 32,768 |

## Verifying pi is actually routing through ali-code

A few quick checks:

1. **Alibaba Coding Plan page** — its quota counter ticks up only when requests hit `coding-intl.dashscope.aliyuncs.com`. Send a message, refresh, confirm increment.
2. **Anthropic / other consoles** stay flat during the session.
3. **Network snoop** — while sending a message:
   ```bash
   ss -tn state established | grep :443 | grep -E "43\.106|43\.98"
   ```
   Hits = Alibaba. `160.79.104.10` = Anthropic.
4. In pi, `/model` highlights the active model.

## Terms of use

Alibaba's Coding Plan terms restrict the key to **interactive** coding tools (Claude Code, OpenCode, Qwen Code, Kilo CLI, and similar). pi falls into that category when used as an interactive assistant. Do **not** use the key for headless batch jobs, custom backends, or account sharing — that can get the subscription suspended or the key revoked.

## Related

- [pi-qwen-fix](https://github.com/ricardo-nth/pi-qwen-fix) — fixes for the standard `alibaba-qwen` provider in pi (pay-as-you-go DashScope, not Coding Plan)
- Upstream: [ricardo-nth/pi-ali-code](https://github.com/ricardo-nth/pi-ali-code)

## License

MIT
