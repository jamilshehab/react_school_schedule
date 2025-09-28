import Select, { MultiValue, SingleValue } from 'react-select';
import makeAnimated from 'react-select/animated';
import { Option } from '../types';

interface Props {
    label: string;
    value: SingleValue<Option> | MultiValue<Option>;
    onChange: (val: any) => void;
    options: Option[];
    isMulti?: boolean;
    onMenuOpen?: () => void;
}

const SelectField: React.FC<Props> = ({ label, value, onChange, options, isMulti = false, onMenuOpen }) => {
    const animatedComponents = makeAnimated();
    return (
        <div className="mb-4">
            <label className="block text-xs font-medium text-gray-500 uppercase">{label}</label>
            <Select
                options={options}
                value={value}
                onChange={onChange}
                isMulti={isMulti}
                closeMenuOnSelect={!isMulti}
                components={animatedComponents}
                onMenuOpen={onMenuOpen}
            />
        </div>
    );
};

export default SelectField;
