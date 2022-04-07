import { FlexBox } from '../../../components';
import { useChain } from '../../../contexts';
import { BlockItem } from '../../../components/web3';

export const Blocks = (): JSX.Element => {
  const { blocks } = useChain();

  return (
    <FlexBox direction="col">
      {[...blocks.values()]
        .sort((a, b) => b.number - a.number)
        .slice(0, 5)
        .map((block) => (
          <BlockItem key={block.number} block={block} />
        ))}
    </FlexBox>
  );
};
