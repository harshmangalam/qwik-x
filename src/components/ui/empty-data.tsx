import { type QwikIntrinsicElements, component$ } from '@builder.io/qwik';
import { EmptyDataIcon } from '~/icons/empty-data';

type Props = {
  body?: string;
} & QwikIntrinsicElements['div'];
export const EmptyData = component$((props: Props) => {
  const { body = '' } = props;
  return (
    <div>
      <EmptyDataIcon />
      {body}
    </div>
  );
});
