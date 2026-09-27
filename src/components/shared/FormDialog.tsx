"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Save, X } from "lucide-react";

export type FieldType =
  | "text"
  | "textarea"
  | "number"
  | "email"
  | "tel"
  | "date"
  | "select"
  | "radio"
  | "checkbox"
  | "switch";

export interface FormField {
  key: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  options?: string[];
  required?: boolean;
  default?: string | number | boolean;
  span?: 1 | 2;
  hint?: string;
}

export interface FormSchema {
  title: string;
  description?: string;
  fields: FormField[];
}

interface FormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  schema: FormSchema;
  onSubmit?: (values: Record<string, unknown>) => void;
  submitLabel?: string;
}

function getDefaults(schema: FormSchema): Record<string, unknown> {
  const defaults: Record<string, unknown> = {};
  schema.fields.forEach((f) => {
    if (f.default !== undefined) defaults[f.key] = f.default;
    else if (f.type === "checkbox") defaults[f.key] = false;
    else if (f.type === "switch") defaults[f.key] = false;
    else defaults[f.key] = "";
  });
  return defaults;
}

export function FormDialog({
  open,
  onOpenChange,
  schema,
  onSubmit,
  submitLabel = "Save Record",
}: FormDialogProps) {
  const { toast } = useToast();
  const [values, setValues] = useState<Record<string, unknown>>(() => getDefaults(schema));
  const [formKey, setFormKey] = useState(0);

  const handleOpenChange = (next: boolean) => {
    if (next) {
      setValues(getDefaults(schema));
      setFormKey((k) => k + 1);
    }
    onOpenChange(next);
  };

  const setValue = (key: string, value: unknown) => {
    setValues((v) => ({ ...v, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const missing = schema.fields.filter((f) => f.required && !values[f.key]);
    if (missing.length > 0) {
      toast({
        title: "Please fill required fields",
        description: missing.map((f) => f.label).join(", "),
        variant: "destructive",
      });
      return;
    }
    onSubmit?.(values);
    toast({
      title: "Record saved (UI demo)",
      description: `${schema.title} form submitted. In production this would create/update a record in the database.`,
    });
    onOpenChange(false);
  };

  const renderField = (field: FormField) => {
    const id = `field-${field.key}`;
    const spanClass = field.span === 2 ? "md:col-span-2" : "";

    const labelEl = (
      <Label htmlFor={id} className="text-sm font-medium">
        {field.label}
        {field.required && <span className="text-destructive ml-0.5">*</span>}
      </Label>
    );

    const hintEl = field.hint ? (
      <p className="text-xs text-muted-foreground mt-1">{field.hint}</p>
    ) : null;

    let control: React.ReactNode = null;

    switch (field.type) {
      case "textarea":
        control = (
          <Textarea
            id={id}
            value={String(values[field.key] ?? "")}
            onChange={(e) => setValue(field.key, e.target.value)}
            placeholder={field.placeholder}
            rows={3}
            className="mt-1"
          />
        );
        break;
      case "number":
        control = (
          <Input
            id={id}
            type="number"
            value={String(values[field.key] ?? "")}
            onChange={(e) => setValue(field.key, e.target.value)}
            placeholder={field.placeholder}
            className="mt-1"
          />
        );
        break;
      case "email":
        control = (
          <Input
            id={id}
            type="email"
            value={String(values[field.key] ?? "")}
            onChange={(e) => setValue(field.key, e.target.value)}
            placeholder={field.placeholder}
            className="mt-1"
          />
        );
        break;
      case "tel":
        control = (
          <Input
            id={id}
            type="tel"
            value={String(values[field.key] ?? "")}
            onChange={(e) => setValue(field.key, e.target.value)}
            placeholder={field.placeholder}
            className="mt-1"
          />
        );
        break;
      case "date":
        control = (
          <Input
            id={id}
            type="date"
            value={String(values[field.key] ?? "")}
            onChange={(e) => setValue(field.key, e.target.value)}
            className="mt-1"
          />
        );
        break;
      case "select":
        control = (
          <Select
            value={String(values[field.key] ?? "")}
            onValueChange={(v) => setValue(field.key, v)}
          >
            <SelectTrigger id={id} className="mt-1">
              <SelectValue placeholder={field.placeholder || "Select..."} />
            </SelectTrigger>
            <SelectContent>
              {(field.options || []).map((opt) => (
                <SelectItem key={opt} value={opt}>
                  {opt}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
        break;
      case "radio":
        control = (
          <RadioGroup
            value={String(values[field.key] ?? "")}
            onValueChange={(v) => setValue(field.key, v)}
            className="flex flex-wrap gap-3 mt-2"
          >
            {(field.options || []).map((opt) => (
              <div key={opt} className="flex items-center gap-1.5">
                <RadioGroupItem value={opt} id={`${id}-${opt}`} />
                <Label htmlFor={`${id}-${opt}`} className="text-sm cursor-pointer font-normal">
                  {opt}
                </Label>
              </div>
            ))}
          </RadioGroup>
        );
        break;
      case "checkbox":
        control = (
          <div className="flex items-center gap-2 mt-2">
            <Checkbox
              id={id}
              checked={Boolean(values[field.key])}
              onCheckedChange={(v) => setValue(field.key, v === true)}
            />
            <Label htmlFor={id} className="text-sm cursor-pointer font-normal">
              {field.placeholder || "Yes"}
            </Label>
          </div>
        );
        break;
      case "switch":
        control = (
          <div className="flex items-center gap-2 mt-2">
            <Switch
              id={id}
              checked={Boolean(values[field.key])}
              onCheckedChange={(v) => setValue(field.key, v)}
            />
            <Label htmlFor={id} className="text-sm cursor-pointer font-normal">
              {field.placeholder || "Enable"}
            </Label>
          </div>
        );
        break;
      default:
        control = (
          <Input
            id={id}
            type="text"
            value={String(values[field.key] ?? "")}
            onChange={(e) => setValue(field.key, e.target.value)}
            placeholder={field.placeholder}
            className="mt-1"
          />
        );
    }

    return (
      <div key={field.key} className={spanClass}>
        {labelEl}
        {control}
        {hintEl}
      </div>
    );
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {schema.title}
            <Badge variant="secondary" className="text-[10px]">UI Demo</Badge>
          </DialogTitle>
          {schema.description && (
            <DialogDescription>{schema.description}</DialogDescription>
          )}
        </DialogHeader>
        <form key={formKey} onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-2">
            {schema.fields.map((field) => renderField(field))}
          </div>
          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              <X className="mr-2 h-4 w-4" /> Cancel
            </Button>
            <Button type="submit">
              <Save className="mr-2 h-4 w-4" /> {submitLabel}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
