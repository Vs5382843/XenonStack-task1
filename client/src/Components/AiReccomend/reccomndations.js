import * as tf from '@tensorflow/tfjs';

// Dummy data for user interactions (e.g., userId, propertyId, interaction level)
const data = [
  { userId: 1, propertyId: 101, interaction: 5 },
  { userId: 1, propertyId: 102, interaction: 3 },
  { userId: 2, propertyId: 101, interaction: 4 },
  { userId: 2, propertyId: 103, interaction: 2 },
];

// Convert the data into a Tensor
const userIds = data.map(d => d.userId);
const propertyIds = data.map(d => d.propertyId);
const interactions = data.map(d => d.interaction);

const userTensor = tf.tensor(userIds);
const propertyTensor = tf.tensor(propertyIds);
const interactionTensor = tf.tensor(interactions);

// Build a simple model to predict property preferences
const model = tf.sequential();

model.add(tf.layers.dense({ inputShape: [1], units: 10, activation: 'relu' }));
model.add(tf.layers.dense({ units: 1 }));

model.compile({ optimizer: 'adam', loss: 'meanSquaredError' });

// Train the model
async function trainModel() {
  const xs = tf.tensor2d(userIds.map(x => [x]));
  const ys = tf.tensor2d(interactions.map(y => [y]));

  await model.fit(xs, ys, {
    epochs: 50,
    callbacks: tf.callbacks.earlyStopping({ monitor: 'loss' })
  });

  console.log('Model trained!');
}

// Function to make predictions
async function recommendPropertiesForUser(userId) {
  const userTensor = tf.tensor2d([[userId]]);
  const predictedInteractions = model.predict(userTensor);
  predictedInteractions.print();

  return predictedInteractions;
}

export { trainModel, recommendPropertiesForUser };