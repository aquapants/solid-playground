// a simple code snippet tokenizer and parser component for HTML, JavaScript & SolidJS code snippets passed as a string
// cause fuck adding dependencies to your project at nauseam // also keeping in the spirit of solidJS as a lightweight framework

import { createMemo, For } from 'solid-js';

// patterns is the definition of possible tokens in CodeSnippets, this is extendable and customizable
// make sure if you add a pattern here, you also add a corresponding switch case to the CodeSnippet Component -
// and provide a desired color class for your new pattern in the return state for the case
const patterns: { [key: string]: RegExp } = {
  keyword:
    /\b(const|let|function|return|if|else|for|while|class|new|import|export|default|async|interface)\b/, // matches JavaScript/Typescript keywords
  htmlTag:
    /\b(h[1-6]|div|span|p|a|ul|ol|li|table|thead|tbody|tr|td|th|img|button|input|form|label|textarea|select|option|section|article|header|footer|nav|main)\b/, // matches HTML tags
  solidComponent:
    /\b(Show|For|ErrorBoundary|Suspense|Switch|Match|Portal|Dynamic)\b/, // matches SolidJS default elements
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

    for (const [type, regex] of Object.entries(patterns)) {
      // TODO: this could probably be optimized better. Current implementation might struggle with really large inputs
      const match = regex.exec(remainingCode); // check each regex pattern against the remaining code
      if (match && match.index === 0) {
        // if there is a regex match at the very start (index 0) of the remaining code
        tokens.push({ type, value: match[0] }); // push the matched pattern with its corresponding type to the tokens array
        remainingCode = remainingCode.slice(match[0].length); // update to remaining code by slicing out the length of the matched pattern
        matched = true;
        break;
      }
    }

    if (!matched) {
      // if no match is found at the very start of the remaining code
      tokens.push({ type: 'plain', value: remainingCode[0] }); // push one character as plain text to the tokens array
      remainingCode = remainingCode.slice(1); // update the remaining code by removing the pushed character
    }
  }

  return tokens;
};

interface CodeSnippetProps {
  code: string;
}

const CodeSnippet = (props: CodeSnippetProps) => {
  const tokens = createMemo(() => tokenizeCode(props.code));

  const getClassForType = (type: string) => {
    switch (type) {
      case 'keyword':
        return 'text-purple-500 font-semibold';
      case 'htmlTag':
        return 'text-red-400 font-medium';
      case 'solidComponent':
        return 'text-cyan-400 font-bold';
      case 'string':
        return 'text-green-400';
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
    <pre class="overflow-x-auto rounded-lg border bg-gray-800 p-4 text-gray-100">
      <code>
        <For each={tokens()}>
          {(token) => (
            <span class={getClassForType(token.type)}>{token.value}</span>
          )}
        </For>
      </code>
    </pre>
  );
};

export default CodeSnippet;
