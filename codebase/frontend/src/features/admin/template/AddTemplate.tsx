import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import { useAddNewtemplateMutation, useGetAlltemplateQuery } from '../../../services/template_service';

interface AddTemplateProps {
    handleCloseDialog: () => void;
}

const AddTemplate: React.FC<AddTemplateProps> = ({ handleCloseDialog }) => {
    const [selectedTemplate, setSelectedTemplate] = useState('');
    const [customTemplate, setCustomTemplate] = useState('');
    const [attributes, setAttributes] = useState<{ key: string; value: string }[]>([]);
    const [addTemplate, { isSuccess: isAddSuccess }] = useAddNewtemplateMutation();

    const { isError: isTemplateError, isLoading: isTemplateLoading, data: templates = [] } = useGetAlltemplateQuery();

    useEffect(() => {
        if (selectedTemplate && selectedTemplate !== 'Other') {
            const selectedTemplateData = templates.find(t => t.name === selectedTemplate);
            if (selectedTemplateData && selectedTemplateData.attributes) {
                console.log("Attribute Names:", selectedTemplateData.attributes.map(attr => attr.name));
                setAttributes(selectedTemplateData.attributes.map(attr => ({ key: attr.name, value: '' })));
            }
        } else {
            setAttributes([]);
        }
    }, [selectedTemplate, templates]);

    const handleAddAttribute = () => {
        setAttributes([...attributes, { key: '', value: '' }]);
    };

    const handleSelectChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setSelectedTemplate(event.target.value as string);
    };

    const handleCustomTemplateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCustomTemplate(event.target.value);
    };

    const handleAttributeChange = (index: number, field: 'key' | 'value', value: string) => {
        const updatedAttributes = attributes.map((attr, i) =>
            i === index ? { ...attr, [field]: value } : attr
        );
        setAttributes(updatedAttributes);
    };

    const handleAddTemplate = async () => {
        const templateToAdd = selectedTemplate === 'Other' && customTemplate ? customTemplate : selectedTemplate;
        const formData = {
            name: templateToAdd,
            attributes: attributes
        };
        console.log(formData);
        await addTemplate(formData)
        handleCloseDialog();

    };

    const handleDiscard = () => {
        handleCloseDialog();
    };

    if (isTemplateLoading) return <div>Loading templates...</div>;
    if (isTemplateError) return <div>Error loading templates: {isTemplateError.message}</div>;

    return (
        <div className='mx-10 mb-10'>
            <form className='space-y-2'>
                <InputLabel id="template-label">Template</InputLabel>
                <Select
                    labelId="template-label"
                    variant="outlined"
                    size="small"
                    className="w-full mt-2"
                    value={selectedTemplate}
                    onChange={handleSelectChange}
                >
                    {templates.map((template) => (
                        <MenuItem key={template.id} value={template.name}>
                            {template.name}
                        </MenuItem>
                    ))}
                    <MenuItem value="Other">Other</MenuItem>
                </Select>

                {selectedTemplate === 'Other' && (
                    <TextField
                        label="New Template"
                        variant="outlined"
                        size="small"
                        className="w-full mt-2"
                        value={customTemplate}
                        onChange={handleCustomTemplateChange}
                    />
                )}

                <div className='w-full'>
                    <p className='mt-4 mb-2'>Attributes</p>
                    {attributes.map((attr, index) => (
                        <div key={index} className='flex gap-4 mb-2'>
                            <TextField
                                label="Name"
                                variant="outlined"
                                size="small"
                                value={attr.key}
                                onChange={(e) => handleAttributeChange(index, 'key', e.target.value)}
                                className="w-full"
                            />
                            <TextField
                                label="Value"
                                variant="outlined"
                                size="small"
                                value={attr.value}
                                onChange={(e) => handleAttributeChange(index, 'value', e.target.value)}
                                className="w-full"
                            />
                        </div>
                    ))}
                    <Button onClick={handleAddAttribute} variant="outlined">
                        Add
                    </Button>
                </div>

                <div className='pt-10'>
                    <div className='flex justify-between gap-5'>
                        <Button variant="outlined" color="error" onClick={handleDiscard}>
                            Discard
                        </Button>
                        <button
                            type="button"
                            className='bg-[#002a47] py-1 px-3 text-white rounded-md'
                            onClick={handleAddTemplate}
                        >
                            Add Template
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddTemplate;
