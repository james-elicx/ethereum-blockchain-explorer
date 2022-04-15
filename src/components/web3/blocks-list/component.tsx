import { FlexBox, Skeleton } from '../../../components';
import { useInfura } from '../../../contexts';
import { BlockItem } from './block-item';

export const Blocks = (): JSX.Element => {
  const { blocks, loadingInitial } = useInfura();

  return loadingInitial ? (
    <Skeleton
      count={5}
      width={250}
      height={34.5}
      style={{ margin: 5, padding: 10, border: '1px solid transparent' }}
    />
  ) : (
    <FlexBox direction="col">
      {[...blocks.values()]
        .sort((a, b) => b.number - a.number)
        .slice(0, 5)
        .map((block) => block && block.number && <BlockItem key={block.number} block={block} />)}
    </FlexBox>
  );
};
