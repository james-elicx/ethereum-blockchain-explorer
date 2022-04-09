import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FlexBox, Input } from '../../components';
import { Button } from '../button';

export const SearchBox = (): JSX.Element => {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState<string>('');

  const search = () => {
    console.log(searchTerm);

    if (/^([0-9]+)$/.test(searchTerm)) {
      console.log('block', searchTerm);
      navigate(`/block/${searchTerm}`);
    } else if (/^0x([A-Fa-f0-9]{64})$/.test(searchTerm)) {
      console.log('tx', searchTerm);
      navigate(`/transaction/${searchTerm}`);
    } else if (/^0x([A-Fa-f0-9]{40})$/.test(searchTerm)) {
      console.log('addy', searchTerm);
      navigate(`/address/${searchTerm}`);
    }
  };

  return (
    <FlexBox direction="col" style={{ margin: '5em 5px', padding: 10 }}>
      <span style={{ fontSize: 16, margin: '10px 15px' }}>
        Search for an address, block, or transaction...
      </span>
      <FlexBox direction="row" style={{ width: 'initial' }}>
        <Input
          value={searchTerm}
          onChange={(e) => setSearchTerm((e.target as HTMLInputElement).value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') search();
          }}
          placeholder="0x52120CC1db2D69d235556aD0ebaFe1dAB99A2913"
          style={{
            width: '100%',
            height: 'fit-content',
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
          }}
        />
        <Button
          style={{ fontSize: 16, margin: 0, borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
          invertColor
          onClick={() => search()}
        >
          Search
        </Button>
      </FlexBox>
    </FlexBox>
  );
};
