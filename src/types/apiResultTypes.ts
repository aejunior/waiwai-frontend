export type CategoryType = {
    id: number;
    category: string;
    description: string;
};

export type MeaningType = {
    id: number;
    meaning_pt: string;
    meaning_ww: string;
    comment_pt: string | null;
    comment_ww: string | null;
    created_at: string;
    updated_at: string;
    word_id: number;
    reference_id: number;
    user_id: number;
};

export type WordType = {
    id: number;
    word: string;
    phonemic: string | null;
    created_at: string;
    updated_at: string;
    categories: CategoryType[];
    meanings: MeaningType[];
    user_id: number;
};
