import { Button } from "./Button";
import { Input } from "./Input";
import { Search } from "../../public/icons/search";

interface SearchbarProps {
    ref: React.RefObject<HTMLInputElement | null>;
    onClick: () => void;
    remove  : Boolean
}

export function Searchbar({ onClick ,ref, remove}: SearchbarProps) {

    return (
        <div className="flex gap-4">
            <Input reference={ref}
                placeholder="Search"
            />
            {!remove && <Button
                variant="primary"
                text="search"
                onClick={onClick}
            />}

            {remove && <div>
                <Button
                variant="primary"
                text="remove search"

                onClick={onClick}
                />
                </div>}
        </div>
    );
}