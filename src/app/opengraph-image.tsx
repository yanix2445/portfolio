import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Yanis Harrat | Portfolio'
export const size = {
    width: 1200,
    height: 630,
}

export const contentType = 'image/png'

export default async function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    fontSize: 128,
                    background: 'linear-gradient(to bottom right, #000000, #1a1a1a)',
                    color: 'white',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'sans-serif',
                }}
            >
                <div style={{
                    fontSize: 80,
                    fontWeight: 'bold',
                    background: 'linear-gradient(to right, #CC9400, #F7DF1E)',
                    backgroundClip: 'text',
                    color: 'transparent',
                    marginBottom: 20
                }}>
                    Yanis Harrat
                </div>
                <div style={{ fontSize: 40, color: '#888' }}>
                    Systems & Networks | Fullstack Logic
                </div>
            </div>
        ),
        {
            ...size,
        }
    )
}
