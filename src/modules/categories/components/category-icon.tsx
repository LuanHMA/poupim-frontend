import { isCategoryIconName } from "@/modules/categories/constants/category-icons";
import { Tag } from "lucide-react";
import { DynamicIcon } from "lucide-react/dynamic";

export type CategoryIconSource = {
    icon?: string | null
    color?: string | null
}

type CategoryIconProps = {
    category?: CategoryIconSource | null
    className?: string
}

export function CategoryIcon({ category, className }: CategoryIconProps) {
    if (!category?.icon) return null

    if (!isCategoryIconName(category.icon)) {
        return <Tag className={className} color={category.color ?? undefined} aria-hidden />
    }

    return <DynamicIcon name={category.icon} color={category.color ?? undefined} className={className} />
}
