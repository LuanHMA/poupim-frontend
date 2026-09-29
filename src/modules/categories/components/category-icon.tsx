import { isCategoryIconName } from "@/modules/categories/constants/category-icons";
import { DynamicIcon } from "lucide-react/dynamic";
import { Tag } from "lucide-react";

type CategoryIconProps = {
    name: string;
    color: string;
    className?: string;
};

export function CategoryIcon({ name, color, className }: CategoryIconProps) {
    if (!isCategoryIconName(name)) {
        return <Tag className={className} color={color} />;
    }

    return <DynamicIcon name={name} color={color} className={className} />;
}
