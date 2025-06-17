import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import PlatformSelector from './components/PlatformSelector';
import SalesInputTable from './components/SalesInputTable';


function SaleInput() {

    const [platform, setPlatform] = useState("mercari");

    return (
        <>
            <Helmet>
                <title>販売</title>
            </Helmet>
            <div>
                <PlatformSelector platform={platform} setPlatform={setPlatform} />
                <SalesInputTable platform={platform} />
            </div>
        </>
    );
}

export default SaleInput;
