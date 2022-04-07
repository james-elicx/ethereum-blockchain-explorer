import { FlexBox } from '../../../components';
import { useInfura } from '../../../contexts';
import { BlockItem } from '../../../components/web3';

export const Blocks = (): JSX.Element => {
  const { blocks } = useInfura();

  return (
    <FlexBox direction="col">
      {blocks
        .sort((a, b) => b.number - a.number)
        .slice(0, 5)
        .map((block) => (
          <BlockItem key={block.number} block={block} />
        ))}
    </FlexBox>
  );
};
