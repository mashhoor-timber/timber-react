import { memo, useState } from 'react';

import { Document, Page, pdfjs } from 'react-pdf';

import Skeleton from '@components/atomic/Skeleton';

import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc =
    'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.4.168/pdf.worker.min.mjs';

interface FileWithId extends File {
    id: string;
}

const options = {
    cMapUrl: '/cmaps/',
    standardFontDataUrl: '/standard_fonts/',
};

function RenderPdf({ file }: { file: FileWithId }) {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <Skeleton isLoaded={isLoaded}>
            <Document
                file={URL.createObjectURL(file)}
                loading={null}
                options={options}
                onLoadSuccess={() => setIsLoaded(true)}
            >
                <Page height={200} pageNumber={1} renderTextLayer={false} />
            </Document>
        </Skeleton>
    );
}

export default memo(RenderPdf);
