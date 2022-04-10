import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FlexBox, Input } from '../../components';
import { useToast } from '../../contexts';
import { Button } from '../button';

export const SearchBox = (): JSX.Element => {
  const navigate = useNavigate();
  const { sendToast } = useToast();

  const [searchTerm, setSearchTerm] = useState<string>('');

  const search = () => {
    if (/^0x([A-Fa-f0-9]{64})$/.test(searchTerm)) {
      navigate(`/tx/${searchTerm}`);
    } else if (/^0x([A-Fa-f0-9]{40})$/.test(searchTerm) || searchTerm.endsWith('.eth')) {
      navigate(`/address/${searchTerm}`);
    } else if (/^([0-9]+)$/.test(searchTerm)) {
      navigate(`/block/${searchTerm}`);
    } else {
      sendToast('Invalid search term.');
    }
  };

  return (
    <FlexBox direction="col" style={{ margin: '5em 5px', padding: 10 }}>
      <span style={{ fontSize: 16, margin: '10px 15px' }}>
        Search for an address, block, or transaction...
      </span>
      <FlexBox direction="row" style={{ width: 'initial' }}>
        <Input
          className="search-box-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm((e.target as HTMLInputElement).value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') search();
          }}
          placeholder="0x52120CC1db2D69d235556aD0ebaFe1dAB99A2913"
        />
        <Button className="search-box-btn" invertColor onClick={() => search()}>
          Search
        </Button>
      </FlexBox>
    </FlexBox>
  );
};
