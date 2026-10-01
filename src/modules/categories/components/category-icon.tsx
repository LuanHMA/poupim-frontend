import { CATEGORY_ICON_COMPONENTS, isCategoryIconName } from "@/modules/categories/constants/category-icons";
import { Tag } from "lucide-react";

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

    const Icon = CATEGORY_ICON_COMPONENTS[category.icon]

    return <Icon className={className} color={category.color ?? undefined} aria-hidden />
}
