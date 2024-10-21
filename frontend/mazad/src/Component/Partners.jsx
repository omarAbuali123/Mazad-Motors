import React from 'react';

const logoUrls = [
    "https://www.svgrepo.com/show/452172/bmw.svg",
    "https://www.svgrepo.com/show/303363/toyota-1-logo.svg",
    "https://www.svgrepo.com/show/303429/dodge-ram-logo.svg",
    "https://www.svgrepo.com/show/330144/chrysler.svg",
    "https://www.svgrepo.com/show/303648/hyundai-automobiles-1-logo.svg",
    "https://www.svgrepo.com/show/446875/gmc.svg", 
    "https://www.svgrepo.com/show/330140/chevrolet.svg", 
    "https://www.svgrepo.com/show/330787/kia.svg", 
    "https://www.svgrepo.com/show/303349/ford-1-logo.svg", 
    "https://www.svgrepo.com/show/303249/mercedes-benz-9-logo.svg", 
    "https://www.svgrepo.com/show/342292/tesla.svg", 
];


const Logocar = () => {
    return (
        <section className='my-10' style={{ padding: '3rem 0', backgroundColor: 'white', overflow: 'hidden', textAlign: 'center' }}>
            <h2 style={{ marginBottom: '2rem', fontSize: '2rem', fontWeight: 'bold', color:'black' }}>شركاؤنا</h2>
            <div style={{ position: 'relative', width: '100%', height: '7rem' }}>
                <div style={{
                    display: 'flex',
                    flexWrap: 'nowrap',
                    gap: '2rem',
                    animation: 'scroll 20s linear infinite',
                }}>
                    {logoUrls.concat(logoUrls).map((url, index) => (
                        <img
                            key={index}
                            src={url}
                            alt={`Sponsor logo ${index + 1}`}
                            style={{
                                height: '8rem',
                                flexShrink: 0,
                                marginRight: '2rem',
                            }}
                        />
                    ))}
                </div>
            </div>

            <style jsx>{`
                @keyframes scroll {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-50%);
                    }
                }
            `}</style>
        </section>
    );
};

export default Logocar;
