import { Progress } from '@heroui/react';

export default function UploadFile() {
    return (
        <div>
            <div className="w-full border-t bg-default-100 p-2 flex flex-col gap-2">
                <div className="flex flex-col gap-1">
                    <span className="text-xs line-clamp-1">Uploading...</span>
                </div>
                <Progress isDisabled size="sm" value={50} />
            </div>
        </div>
    );
}
