import { ParentProps } from 'solid-js';

const WideLayout = (props: ParentProps) => {
  return (
    <div class="min-h-dvh">
      <main class="w-full px-4 py-4">{props.children}</main>
    </div>
  );
};

export default WideLayout;
