import { Question } from '@/components/Quiz/types';

export const dataScienceQuiz: Question[] = [
  {
    id: 'ds-1',
    question: 'Quelle est la principale différence entre les données structurées et non structurées ?',
    difficulty: 'easy',
    category: 'Fondamentaux',
    answers: [
      {
        id: 'ds-1-a',
        text: 'Les données structurées sont organisées en tableaux, les non structurées non',
        isCorrect: true
      },
      {
        id: 'ds-1-b',
        text: 'Les données structurées sont plus volumineuses',
        isCorrect: false
      },
      {
        id: 'ds-1-c',
        text: 'Les données non structurées sont toujours numériques',
        isCorrect: false
      },
      {
        id: 'ds-1-d',
        text: 'Il n\'y a pas de différence',
        isCorrect: false
      }
    ],
    explanation: 'Les données structurées sont organisées selon un modèle prédéfini, généralement en tableaux avec des lignes et des colonnes (comme les DataFrames pandas). Les données non structurées (comme le texte, les images) n\'ont pas de format prédéfini.'
  },
  {
    id: 'ds-2',
    question: 'Quelle méthode pandas utilise-t-on pour afficher les premières lignes d\'un DataFrame ?',
    difficulty: 'easy',
    category: 'Pandas',
    answers: [
      { id: 'ds-2-a', text: 'df.show()', isCorrect: false },
      { id: 'ds-2-b', text: 'df.head()', isCorrect: true },
      { id: 'ds-2-c', text: 'df.display()', isCorrect: false },
      { id: 'ds-2-d', text: 'df.preview()', isCorrect: false }
    ],
    explanation: 'La méthode df.head() est utilisée pour afficher les premières lignes d\'un DataFrame (par défaut les 5 premières). On peut spécifier un nombre différent en argument : df.head(10) pour les 10 premières lignes.'
  },
  {
    id: 'ds-3',
    question: 'Quelle est la différence entre .loc[] et .iloc[] en pandas ?',
    difficulty: 'medium',
    category: 'Pandas',
    answers: [
      {
        id: 'ds-3-a',
        text: '.loc[] utilise les étiquettes, .iloc[] utilise les positions numériques',
        isCorrect: true
      },
      {
        id: 'ds-3-b',
        text: '.loc[] est plus rapide que .iloc[]',
        isCorrect: false
      },
      {
        id: 'ds-3-c',
        text: '.iloc[] fonctionne uniquement avec des chaînes de caractères',
        isCorrect: false
      },
      {
        id: 'ds-3-d',
        text: 'Il n\'y a pas de différence',
        isCorrect: false
      }
    ],
    explanation: '.loc[] est basé sur les étiquettes (labels) des index et colonnes, tandis que .iloc[] est basé sur les positions numériques (comme les indices d\'un tableau). Par exemple, df.loc[\'ligne1\', \'colonneA\'] vs df.iloc[0, 0].'
  },
  {
    id: 'ds-4',
    question: 'Quelle méthode utilise-t-on pour remplacer les valeurs manquantes par la moyenne dans une colonne ?',
    difficulty: 'medium',
    category: 'Nettoyage des données',
    answers: [
      { id: 'ds-4-a', text: 'df.fillna()', isCorrect: true },
      { id: 'ds-4-b', text: 'df.replace()', isCorrect: false },
      { id: 'ds-4-c', text: 'df.dropna()', isCorrect: false },
      { id: 'ds-4-d', text: 'df.mean()', isCorrect: false }
    ],
    explanation: 'df.fillna() est utilisé pour remplacer les valeurs manquantes. Par exemple : df[\'colonne\'].fillna(df[\'colonne\'].mean(), inplace=True) remplace les valeurs manquantes par la moyenne de la colonne.'
  },
  {
    id: 'ds-5',
    question: 'Quelle bibliothèque est principalement utilisée pour la visualisation en Python ?',
    difficulty: 'easy',
    category: 'Visualisation',
    answers: [
      { id: 'ds-5-a', text: 'NumPy', isCorrect: false },
      { id: 'ds-5-b', text: 'Pandas', isCorrect: false },
      { id: 'ds-5-c', text: 'Matplotlib', isCorrect: true },
      { id: 'ds-5-d', text: 'Scikit-learn', isCorrect: false }
    ],
    explanation: 'Matplotlib est la bibliothèque de visualisation la plus utilisée en Python. Elle fournit une interface de bas niveau pour créer des graphiques. Des bibliothèques comme Seaborn sont construites sur Matplotlib et offrent des visualisations statistiques de plus haut niveau.'
  },
  {
    id: 'ds-6',
    question: 'Quelle est la différence entre une jointure (merge) et une concaténation (concat) en pandas ?',
    difficulty: 'hard',
    category: 'Pandas',
    answers: [
      {
        id: 'ds-6-a',
        text: 'Merge combine sur des colonnes clés, concat empile les DataFrames',
        isCorrect: true
      },
      {
        id: 'ds-6-b',
        text: 'Concat est plus rapide que merge',
        isCorrect: false
      },
      {
        id: 'ds-6-c',
        text: 'Merge ne fonctionne qu\'avec des colonnes numériques',
        isCorrect: false
      },
      {
        id: 'ds-6-d',
        text: 'Il n\'y a pas de différence',
        isCorrect: false
      }
    ],
    explanation: 'pd.merge() combine les DataFrames en fonction de valeurs de colonnes communes (comme une jointure SQL), tandis que pd.concat() empile les DataFrames verticalement ou horizontalement, sans nécessairement avoir de colonnes communes.'
  },
  {
    id: 'ds-7',
    question: 'Quelle méthode utilise-t-on pour appliquer une fonction à chaque élément d\'une série pandas ?',
    difficulty: 'medium',
    category: 'Pandas',
    answers: [
      { id: 'ds-7-a', text: 'apply()', isCorrect: true },
      { id: 'ds-7-b', text: 'map()', isCorrect: false },
      { id: 'ds-7-c', text: 'transform()', isCorrect: false },
      { id: 'ds-7-d', text: 'Toutes ces réponses', isCorrect: false }
    ],
    explanation: 'apply() est utilisé pour appliquer une fonction le long d\'un axe du DataFrame ou sur les valeurs d\'une Série. map() est similaire mais spécifique aux séries, et transform() est utilisé pour des transformations sur des groupes après un groupby().'
  },
  {
    id: 'ds-8',
    question: 'Quelle est la différence entre value_counts() et groupby().size() ?',
    difficulty: 'hard',
    category: 'Pandas',
    answers: [
      {
        id: 'ds-8-a',
        text: 'value_counts() est plus rapide et trie par défaut',
        isCorrect: true
      },
      {
        id: 'ds-8-b',
        text: 'groupby().size() est obsolète',
        isCorrect: false
      },
      {
        id: 'ds-8-c',
        text: 'Ils sont identiques en tous points',
        isCorrect: false
      },
      {
        id: 'ds-8-d',
        text: 'value_counts() ne fonctionne que sur des chaînes de caractères',
        isCorrect: false
      }
    ],
    explanation: 'value_counts() est une méthode plus directe et plus rapide pour compter les occurrences uniques dans une série. Elle trie par défaut les résultats par ordre décroissant. groupby().size() est plus générique et peut être utilisé pour des groupages plus complexes.'
  },
  {
    id: 'ds-9',
    question: 'Comment sélectionne-t-on les lignes où une colonne a des valeurs supérieures à la moyenne ?',
    difficulty: 'medium',
    category: 'Pandas',
    answers: [
      { id: 'ds-9-a', text: 'df[df[\'col\'] > df[\'col\'].mean()]', isCorrect: true },
      { id: 'ds-9-b', text: 'df[df[\'col\'] > mean(df[\'col\'])]', isCorrect: false },
      { id: 'ds-9-c', text: 'df.filter(df[\'col\'] > df[\'col\'].mean())', isCorrect: false },
      { id: 'ds-9-d', text: 'df.select(\'col\' > mean(\'col\'))', isCorrect: false }
    ],
    explanation: 'La syntaxe correcte utilise l\'indexation booléenne : df[df[\'col\'] > df[\'col\'].mean()]. Cela crée un masque booléen qui filtre les lignes où la condition est vraie.'
  },
  {
    id: 'ds-10',
    question: 'Quelle méthode utilise-t-on pour enregistrer un DataFrame dans un fichier CSV ?',
    difficulty: 'easy',
    category: 'Pandas',
    answers: [
      { id: 'ds-10-a', text: 'df.to_csv()', isCorrect: true },
      { id: 'ds-10-b', text: 'df.save_csv()', isCorrect: false },
      { id: 'ds-10-c', text: 'df.export()', isCorrect: false },
      { id: 'ds-10-d', text: 'df.write_csv()', isCorrect: false }
    ],
    explanation: 'La méthode to_csv() est utilisée pour enregistrer un DataFrame dans un fichier CSV. Par exemple : df.to_csv(\'fichier.csv\', index=False). Le paramètre index=False évite d\'enregistrer l\'index dans le fichier CSV.'
  },
  {
    id: 'ds-11',
    question: 'Quelle est la différence entre la moyenne et la médiane ?',
    difficulty: 'medium',
    category: 'Statistiques',
    answers: [
      {
        id: 'ds-11-a',
        text: 'La moyenne est la somme divisée par le nombre d\'éléments, la médiane est la valeur du milieu',
        isCorrect: true
      },
      {
        id: 'ds-11-b',
        text: 'La médiane est toujours plus grande que la moyenne',
        isCorrect: false
      },
      {
        id: 'ds-11-c',
        text: 'La moyenne est plus robuste aux valeurs aberrantes',
        isCorrect: false
      },
      {
        id: 'ds-11-d',
        text: 'Il n\'y a pas de différence',
        isCorrect: false
      }
    ],
    explanation: 'La moyenne est la somme de toutes les valeurs divisée par le nombre de valeurs. La médiane est la valeur qui sépare la moitié supérieure de la moitié inférieure des données. La médiane est plus robuste aux valeurs aberrantes que la moyenne.'
  },
  {
    id: 'ds-12',
    question: 'Comment crée-t-on un graphique à barres avec Seaborn ?',
    difficulty: 'easy',
    category: 'Visualisation',
    answers: [
      { id: 'ds-12-a', text: 'sns.barplot()', isCorrect: true },
      { id: 'ds-12-b', text: 'sns.histplot()', isCorrect: false },
      { id: 'ds-12-c', text: 'sns.lineplot()', isCorrect: false },
      { id: 'ds-12-d', text: 'sns.scatterplot()', isCorrect: false }
    ],
    explanation: 'sns.barplot() est utilisé pour créer des graphiques à barres dans Seaborn. Par exemple : sns.barplot(x=\'categorie\', y=\'valeur\', data=df). Les autres options sont pour d\'autres types de visualisations : histogrammes, courbes et nuages de points.'
  }
];

export default dataScienceQuiz;
