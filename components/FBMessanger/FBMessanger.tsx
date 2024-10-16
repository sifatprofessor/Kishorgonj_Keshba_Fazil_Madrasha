'use client'
import { CustomChat, FacebookProvider } from 'react-facebook';

const FBMessanger = () => {
    return (
        <FacebookProvider appId="2185039398503674" chatSupport>
            <CustomChat pageId="155456620987075" minimized={true} />
        </FacebookProvider>

    )
}

export default FBMessanger
