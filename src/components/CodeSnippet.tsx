// a simple code snippet tokenizer and parser component for HTML, JavaScript & SolidJS code snippets passed as a string
// cause fuck adding dependencies to your project at nauseam // also keeping in the spirit of solidJS as a lightweight framework

import { For } from 'solid-js';

// patterns is the definition of possible tokens in CodeSnippets, this is extendable and customizable
// make sure if you add a pattern here, you also add a corresponding switch case to the CodeSnippet Component
// and provide a desired color class for your new pattern in the return state for the case
const patterns: { [key: string]: RegExp } = {
  keyword:
    /\b(const|let|function|return|if|else|for|while|class|new|import|export|default)\b/, // matches JavaScript keywords
  htmlTag:
    /\b(h[1-6]|div|span|p|a|ul|ol|li|table|thead|tbody|tr|td|th|img|button|input|form|label|textarea|select|option|section|article|header|footer|nav|main)\b/, // matches HTML tags
  solidComponent:
    /\b(Show|For|ErrorBoundary|Suspense|Switch|Match|Portal|Dynamic)\b/, // matches SolidJS components
  string: /(['"`])(.*?)\1/,
  comment: /(\/\/.*)/,
  number: /\b\d+(\.\d+)?\b/,
  operator: /[+\-*/=<>!&|]+/,
};

// helper funciton to tokenize the code snippet
// TODO: add unit tests for tokenizer
const tokenizeCode = (code: string): { type: string; value: string }[] => {
  const tokens: { type: string; value: string }[] = [];
  let remainingCode = code;

  while (remainingCode) {
    let matched = false;

    // if match, add the token to the dictionary with the appropriate type matched from patterns
    for (const [type, regex] of Object.entries(patterns)) {
      const match = regex.exec(remainingCode);
      if (match && match.index === 0) {
        tokens.push({ type, value: match[0] });
        remainingCode = remainingCode.slice(match[0].length);
        matched = true;
        break;
      }
    }

    if (!matched) {
      // if no match, treat the next characters as plain text
      tokens.push({ type: 'plain', value: remainingCode[0] });
      remainingCode = remainingCode.slice(1);
    }
  }

  return tokens;
};

interface CodeSnippetProps {
  code: string;
}

const CodeSnippet = (props: CodeSnippetProps) => {
  const tokens = tokenizeCode(props.code);

  const getClassForType = (type: string) => {
    switch (type) {
      case 'keyword':
        return 'text-blue-500 font-semibold'; // blue for JavaScript keywords
      case 'htmlTag':
        return 'text-red-400 font-medium'; // lighter red for HTML tags, goes with "operator" red
      case 'solidComponent':
        return 'text-cyan-400 font-bold'; // cyan for SolidJS components
      case 'string':
        return 'text-green-500';
      case 'comment':
        return 'text-gray-500 italic';
      case 'number':
        return 'text-purple-500';
      case 'operator':
        return 'text-red-500';
      default:
        return 'text-gray-100';
    }
  };

  return (
    <pre class="overflow-x-auto rounded-lg border bg-gray-900 p-4 text-gray-100">
      <code>
        <For each={tokens}>
          {(token) => (
            <span class={getClassForType(token.type)}>{token.value}</span>
          )}
        </For>
      </code>
    </pre>
  );
};

export default CodeSnippet;
