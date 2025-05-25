import Button from '@mui/material/Button';
import React from 'react'

type CategoryNavProps = {
    readonly categories: string[]
    readonly selectedCategory: string
    readonly onSelectCategory: (category: string) => void
}

export default function CategoryNav({ categories, selectedCategory, onSelectCategory }: CategoryNavProps) {
    return (
        <div className="flex flex-wrap gap-2 mb-4">
            {categories.map((category) => (
                <Button
                    key={category}
                    // variant={selectedCategory === category ? 'default' : 'outline'}
                    variant={selectedCategory === category ? 'contained' : 'outlined'}
                    onClick={() => onSelectCategory(category)}
                >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                </Button>
            ))}
        </div>
    )
}

