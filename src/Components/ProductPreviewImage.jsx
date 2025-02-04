import React, { useRef } from 'react';
import html2canvas from 'html2canvas';

const ProductPreviewImage = ({ isList = false, colorCode = '#ffffff', objectData = {}, onPrevSelect, isButtonShow = true }) => {
    const divRef = useRef(null)

    const redirectToPreview = () => {
        if (divRef.current) {
            html2canvas(divRef.current, {
                allowTaint: true,
                useCORS: true,
                logging: true,
                backgroundColor: null,
                scale: 3,
            }).then((canvas) => {
                // Create a new canvas element with fixed dimensions
                const fixedCanvas = document.createElement('canvas');
                fixedCanvas.width = 1500;
                fixedCanvas.height = 1500;
                const ctx = fixedCanvas.getContext('2d');

                // Draw the original canvas onto the new canvas
                ctx.drawImage(canvas, 0, 0, 1500, 1500);

                // Convert the new canvas to a Blob
                fixedCanvas.toBlob((blob) => {
                    if (blob) {
                        const a = document.createElement('a');
                        a.href = URL.createObjectURL(blob);
                        a.target = '_blank';
                        a.click();
                    }
                }, 'image/png');
            });
        }
    }

    const BigPreview = () => {
        return (
            <div className='custom-big-preview-hover position-relative h-100 w-100 pointer' ref={divRef}>
                <img
                    className='preview-img-background'
                    style={{
                        backgroundColor: colorCode,
                        height: 'inherit',
                        width: 'inherit'
                    }}
                    src={objectData?.preview}
                />
                {
                    objectData?.imgURL && (
                        <img
                            className='position-absolute preview-img-overlay'
                            src={objectData?.imgURL}
                            style={{
                                height: `${objectData?.ratioData?.height / 5}%`,
                                width: `${objectData?.ratioData?.width / 5}%`,
                                top: `${objectData?.ratioData?.y / 5}%`,
                                left: `${objectData?.ratioData?.x / 5}%`,
                            }}
                        />
                    )
                }
                {
                    (isButtonShow) &&
                    <span className='fs-20 fs-md-18 fs-sm-16' style={{ "--headTextColor": colorCode }}>Click to Preview</span>
                }
                <a
                    className='position-absolute h-100 w-100 top-0 start-0'
                    onClick={redirectToPreview}
                    onContextMenu={() => false}
                ></a>
            </div>
        )
    }

    const Listpreview = () => {
        return (
            <>
                <div
                    className='position-relative aspect-1-1 w-100'
                    onClick={() =>
                        onPrevSelect({
                            value: objectData?.value,
                            preview: objectData?.preview,
                            index: objectData?.index
                        })}
                >
                    <img
                        style={{
                            backgroundColor: colorCode,
                            height: 'inherit',
                            width: 'inherit'
                        }}
                        src={objectData?.preview}
                    />
                    {
                        objectData?.imgURL && (
                            <img
                                className='position-absolute'
                                src={objectData?.imgURL}
                                style={{
                                    height: `${objectData?.ratioData?.height / 5}%`,
                                    width: `${objectData?.ratioData?.width / 5}%`,
                                    top: `${objectData?.ratioData?.y / 5}%`,
                                    left: `${objectData?.ratioData?.x / 5}%`,
                                }}
                            />
                        )
                    }
                    <a
                        className='position-absolute h-100 w-100 top-0 start-0 z-3'
                        onContextMenu={() => false}
                    ></a>

                </div>

            </>
        )
    }




    return (
        <>{isList ? <Listpreview /> : <BigPreview />}</>
    );
}

export default ProductPreviewImage;
