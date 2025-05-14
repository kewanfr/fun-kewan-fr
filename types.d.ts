interface Idea {
  text: string;
  done: boolean;
}

interface DateJarAddProps {
  ideas: Record<string, Idea[]>;
  onAdd: (letter: string, text: string) => void;
  onToggle: (letter: string, idx: number) => void;
}

export type { Idea, DateJarAddProps };